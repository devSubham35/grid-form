import React, { useState } from "react";
import {
  MoreVertical,
  Trash2,
  Edit,
  EyeIcon
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";

interface Props {
  onDelete?: () => void;
  onEdit?: () => void;
  onAssign?: () => void;
  onView?: () => void;
  idDelete?: boolean;
  selectedAccess?: string;
  isAssign?: boolean;
  isEdit?: boolean;
  isView?: boolean;
}

const DataTableAction: React.FC<Props> = ({
  onDelete,
  onEdit,
  idDelete,
  onAssign,
  // selectedAccess,
  isAssign,
  isEdit,
  isView,
  onView,
}) => {
  const [isOpenDeleteDialog, setOpenDeleteDialogStatus] = useState(false);

  const openDeleteDialog = () => setOpenDeleteDialogStatus(true);
  const closeDeleteDialog = () => setOpenDeleteDialogStatus(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          {idDelete && (
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                openDeleteDialog();
              }}
              className="text-red-600 focus:bg-red-50 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          )}

          {isEdit && (
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                onEdit?.();
              }}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
          )}

          {isAssign && (
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                onAssign?.();
              }}
            >
              <Edit className="mr-2 h-4 w-4" />
              Assign
            </DropdownMenuItem>
          )}

          {isView && (
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                onView?.();
              }}
            >
              <EyeIcon className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isOpenDeleteDialog} onOpenChange={closeDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={closeDeleteDialog}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                closeDeleteDialog();
                onDelete?.();
              }}
            >
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DataTableAction;