import Link from "next/link";
import * as React from "react";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { LinkType } from "@/types";
import { Icons } from "../icons";
import { formatDate } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "../ui/use-toast";
import { deleteLink } from "@/app/api/links";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const tableColumns: ColumnDef<LinkType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title") || "Untitled"}</div>
    ),
  },
  {
    accessorKey: "originalUrl",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Original URL
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Link
        className="lowercase"
        href={row.getValue("originalUrl")}
        target="_blank"
      >
        {row.getValue("originalUrl")}
      </Link>
    ),
  },
  {
    accessorKey: "shortenUrl",
    header: () => <div className="font-medium">Shorten URL</div>,
    cell: ({ row }) => (
      <Link href={row.getValue("shortenUrl")} target="_blank">
        {row.getValue("shortenUrl")}
      </Link>
    ),
  },
  {
    accessorKey: "clicks",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Clicks
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const clicks = parseFloat(row.getValue("clicks"));
      return <div className="text-center font-medium">{clicks}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated at
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formattedDate = formatDate(row.getValue("updatedAt"));
      return <div className="text-center lowercase mr-10">{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const links = row.original;
      const queryClient = useQueryClient();

      const [showDeleteAlert, setShowDeleteAlert] =
        React.useState<boolean>(false);

      const { mutateAsync: deleteLinkMutation, isPending } = useMutation({
        mutationFn: async () => {
          if (!links.userId || !links?.token) return;
          return deleteLink(links.userId, links.id, links?.token);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["links"] });

          return toast({
            title: "Link successfully deleted!",
          });
        },
        onError: (err: AxiosError) => {
          const errorMessage = (err.response?.data as { message?: string })
            ?.message;

          if (errorMessage) {
            return toast({
              title: `${errorMessage
                .charAt(0)
                ?.toUpperCase()}${errorMessage.slice(1)}!`,
              description: "Please try again later.",
              variant: "destructive",
            });
          }

          return toast({
            title: "Something went wrong!",
            description: "Please try again later.",
            variant: "destructive",
          });
        },
      });

      const handleDeleteLink = async (
        e: React.MouseEvent<HTMLButtonElement>
      ) => {
        e.preventDefault();

        try {
          await deleteLinkMutation();
        } catch (err) {
          console.error(err);
        } finally {
          setShowDeleteAlert(false);
        }
      };

      return (
        <div className="flex">
          <Button className="h-8 w-8" variant="ghost">
            <div
              onClick={() => {
                toast({
                  title: "Link copied to clipboard!",
                });
                navigator.clipboard.writeText(links.shortenUrl);
              }}
            >
              <Icons.copy className="h-4 w-4" />
            </div>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <Link href={`/dashboard/editor/${links.id}`}>Edit</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex cursor-pointer items-center text-destructive focus:text-destructive"
                onSelect={() => setShowDeleteAlert(true)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete this link?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600 focus:ring-red-600"
                  onClick={(e) => handleDeleteLink(e)}
                >
                  {isPending ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Icons.trash className="mr-2 h-4 w-4" />
                  )}
                  <span>Delete</span>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
