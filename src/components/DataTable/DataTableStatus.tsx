import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export enum BaseDataStatus {
  Active = "Active",
  Inactive = "Inactive",
  Resolved = "Resolved",
  Pending = "Pending",
  Ongoing = "Ongoing"
}

interface Props {
  status: BaseDataStatus;
  onStatusChange?: () => void;
  noClick?: boolean;
}

const DataTableStatus: React.FC<Props> = ({ status, onStatusChange, noClick }) => {
  const [isOpenConfirmStatus, setOpenConfirmStatus] = React.useState(false);
  
  const handleOpenConfirmStatus = () => setOpenConfirmStatus(true);
  const handleCloseConfirmStatus = () => setOpenConfirmStatus(false);

  // const getStatusVariant = () => {
  //   switch (status) {
  //     case BaseDataStatus.Active:
  //     case BaseDataStatus.Resolved:
  //       return "success";
  //     case BaseDataStatus.Inactive:
  //     case BaseDataStatus.Ongoing:
  //       return "destructive";
  //     case BaseDataStatus.Pending:
  //       return "warning";
  //     default:
  //       return "secondary";
  //   }
  // };

  return (
    <>
      <Badge 
        variant="outline" 
        className={`capitalize ${noClick ? '' : 'cursor-pointer hover:bg-secondary/20'}`}
        onClick={noClick ? () => null : handleOpenConfirmStatus}
      >
        {status}
      </Badge>
      <Dialog open={isOpenConfirmStatus} onOpenChange={setOpenConfirmStatus}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Status</DialogTitle>
            <DialogDescription>
              Are you sure you want to change?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={() => {
                handleCloseConfirmStatus();
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                onStatusChange && onStatusChange();
              }}
            >
              Yes
            </Button>
            <Button variant="outline" onClick={handleCloseConfirmStatus}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DataTableStatus;