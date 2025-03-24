import React from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";

interface Props {
  disabled?: boolean;
  onBulkDelete?: () => void;
  children?: React.ReactNode;
}

const DataTableBulkDeleteButton: React.FC<Props> = ({
  disabled,
  onBulkDelete,
  children,
}) => {
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = React.useState(false);

  const openDeleteDialog = () => setIsOpenDeleteDialog(true);
  const closeDeleteDialog = () => setIsOpenDeleteDialog(false);

  return (
    <>
      <Button
        variant="destructive"
        disabled={disabled}
        onClick={openDeleteDialog}
        className="flex items-center gap-2"
      >
        <Trash2 className="h-4 w-4" />
        {children || "Delete"}
      </Button>
      <Dialog open={isOpenDeleteDialog} onOpenChange={setIsOpenDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bulk Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={() => {
                closeDeleteDialog();
                onBulkDelete?.();
              }}
            >
              Yes
            </Button>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DataTableBulkDeleteButton;