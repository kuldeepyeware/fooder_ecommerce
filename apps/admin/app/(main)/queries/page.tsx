"use client";

import { useState, useEffect } from "react";
import { deleteQuery, getQueries } from "../../../actions/query";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components";
import { EyeIcon, TrashIcon } from "@repo/ui/icons";
import { CardFooter } from "@repo/ui/uicomponents/ui/card";

interface Query {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}

const QueryPage = () => {
  const [queries, setQueries] = useState<Query[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchQueries = async (page: number) => {
    try {
      const { queries, totalPages } = await getQueries(page);
      setQueries(queries);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching queries:", error);
    }
  };

  useEffect(() => {
    fetchQueries(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const openDialog = (query: Query) => {
    setSelectedQuery(query);
    setIsDialogOpen(true);
  };

  const handleDeleteQuery = async (queryId: string) => {
    if (confirm("Are you sure you want to delete this query?")) {
      const result = await deleteQuery(queryId);
      if (result.success) {
        setQueries(queries.filter((query) => query.id !== queryId));
      } else {
        alert("Failed to delete query. Please try again.");
      }
    }
  };

  return (
    <main className='flex-1 p-6 max-w-[450px] sm:max-w-full'>
      <div className=''>
        <Card>
          <CardHeader>
            <CardTitle>Recent Queries</CardTitle>
            <CardDescription>
              View and manage your recent queries
            </CardDescription>
          </CardHeader>
          {queries.length >= 1 ? (
            <>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {queries.map((query) => (
                      <TableRow key={query.id}>
                        <TableCell>{query.name}</TableCell>
                        <TableCell>{query.email}</TableCell>
                        <TableCell>{query.subject}</TableCell>
                        <TableCell>
                          {query.message.length > 50
                            ? `${query.message.substring(0, 50)}...`
                            : query.message}
                        </TableCell>
                        <TableCell>
                          <div className='flex justify-center items-center gap-4 h-full'>
                            <Button
                              variant='outline'
                              size='icon'
                              onClick={() => openDialog(query)}>
                              <EyeIcon className='h-4 w-4' />
                              <span className='sr-only'>View query</span>
                            </Button>
                            <Button
                              variant='outline'
                              size='icon'
                              onClick={() => handleDeleteQuery(query.id)}>
                              <TrashIcon className='h-4 w-4' />
                              <span className='sr-only'>Delete query</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          handlePageChange(Math.max(1, currentPage - 1))
                        }
                      />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink
                          onClick={() => handlePageChange(index + 1)}
                          isActive={currentPage === index + 1}>
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          handlePageChange(
                            Math.min(totalPages, currentPage + 1)
                          )
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardFooter>
            </>
          ) : (
            <div className='ml-7 min-h-[200px] justify-center text-xl font-medium items-center flex'>
              No queries generated yet
            </div>
          )}
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='overflow-auto max-h-[700px]'>
          <DialogHeader>
            <DialogTitle>Query Details</DialogTitle>
          </DialogHeader>
          {selectedQuery && (
            <div className='space-y-3'>
              <p>
                <strong>Name:</strong> {selectedQuery.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedQuery.email}
              </p>
              <p>
                <strong>Subject:</strong> {selectedQuery.subject}
              </p>
              <p className=' text-justify'>
                <strong>Message:</strong> {selectedQuery.message}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default QueryPage;
