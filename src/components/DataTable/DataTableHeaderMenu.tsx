import React from "react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, FileSpreadsheet, File } from "lucide-react";

interface Props {
  onPrint?: () => void;
  onExportCSV?: () => void;
  onExportExcel?: () => void;
}

const DataTableHeaderMenu: React.FC<Props> = ({
  onExportCSV,
  onExportExcel,
  // onPrint,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {/* Uncomment if print functionality is needed
        <DropdownMenuItem onSelect={onPrint}>
          <Printer className="mr-2 h-4 w-4" />
          Print
        </DropdownMenuItem>
        */}
        <DropdownMenuItem onSelect={onExportCSV}>
          <File className="mr-2 h-4 w-4" />
          Export CSV
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={onExportExcel}>
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Export Excel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DataTableHeaderMenu;