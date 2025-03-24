import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CustomPaginationProps {
  onPageSizeChange: (newPageSize: number) => void;
  onPageChange: (pageNumber: number) => void;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  onPageSizeChange,
  onPageChange,
  currentPage,
  pageSize,
  totalPages,
  totalCount,
}) => {
  return (
    <Card className="flex justify-between items-center p-4 border-t rounded-b-lg mt-[-4px]">
      <div className="flex items-center gap-2">
        <span className="text-sm">Page Size:</span>
        <Select onValueChange={(value) => onPageSizeChange(Number(value))} defaultValue={String(pageSize)}>
          <SelectTrigger className="w-[80px] text-sm">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <span className="text-sm text-gray-500">
        <span className="font-medium text-black">{(currentPage - 1) * pageSize + 1}</span> to
        <span className="font-medium text-black"> {Math.min(currentPage * pageSize, totalCount)}</span> of
        <span className="font-medium text-black"> {totalCount}</span>
      </span>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => onPageChange(1)} disabled={currentPage === 1}>
          <ChevronsLeft className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <span className="text-sm">Page {currentPage} of {totalPages}</span>
        <Button variant="ghost" size="icon" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage >= totalPages}>
          <ChevronRight className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onPageChange(totalPages)} disabled={currentPage >= totalPages}>
          <ChevronsRight className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};

export default CustomPagination;
