"use client";

import { useState } from "react";

interface LinkOperationsProps {
  link: any;
}

const LinkOperations = ({ link }: LinkOperationsProps) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [isDeleteLoading, setisDeleteLoading] = useState<boolean>(false);

  return <div>Link Operations</div>;
};

export default LinkOperations;
