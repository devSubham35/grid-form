import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CustomPaginationProps {
  onPageSizeChange: (newPageSize: number) => void;
  onPageChnage: (pageNumber: number) => void;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({ 
  onPageSizeChange, 
  onPageChnage, 
  currentPage, 
  pageSize, 
  totalPages, 
  totalCount 
}) => {
  const handlePageSizeChange = (newSize: string) => {
    onPageSizeChange(Number(newSize));
  };

  const startItem = ((currentPage - 1) * pageSize) + 1;
  const endItem = Math.min(currentPage * pageSize, totalCount);

  return (
    <div className="flex items-center justify-end p-4 border border-t-0 rounded-b-lg border-gray-200 space-x-4">
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">Page Size:</span>
        <Select 
          value={pageSize.toString()} 
          onValueChange={handlePageSizeChange}
        >
          <SelectTrigger className="w-[80px]">
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

      <div className="text-sm text-gray-600">
        <span className="font-medium text-black">{startItem}</span> to <span className="font-medium text-black">{endItem}</span> of <span className="font-medium text-black">{totalCount}</span>
      </div>

      <div className="flex items-center space-x-1">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => onPageChnage(1)}
          disabled={currentPage === 1}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => currentPage !== 1 && onPageChnage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <span className="text-sm px-2">
          Page {currentPage} of {totalPages}
        </span>
        
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => currentPage < totalPages && onPageChnage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => onPageChnage(totalPages)}
          disabled={currentPage === totalPages}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CustomPagination;