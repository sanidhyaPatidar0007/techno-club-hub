
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  File, 
  FileText, 
  Filter, 
  Lock, 
  Upload
} from 'lucide-react';
import PageLayout from '@/components/PageLayout';

const ResourceGovernance = () => {
  const actionButtons = (
    <>
      <Button size="sm" variant="outline">
        <Filter className="mr-2 h-4 w-4" />
        Filter
      </Button>
      <Button size="sm">
        <Upload className="mr-2 h-4 w-4" />
        Upload Resource
      </Button>
    </>
  );

  return (
    <PageLayout 
      title="Resource Governance" 
      description="Securely store and share resources across chapters"
      backgroundImage="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=10"
      actions={actionButtons}
    >
      {/* Search and Filter Section */}
      <motion.div 
        className="mb-8 flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="flex-1">
          <Input 
            placeholder="Search resources..." 
            className="w-full"
          />
        </div>
        <div className="flex gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="ppt">PPT</SelectItem>
              <SelectItem value="doc">DOC</SelectItem>
              <SelectItem value="code">Code</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chapter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Chapters</SelectItem>
              <SelectItem value="ieee">IEEE</SelectItem>
              <SelectItem value="acm">ACM</SelectItem>
              <SelectItem value="gdsc">GDSC</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>
      
      {/* Resources Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="rounded-md border shadow-sm overflow-hidden"
      >
        <Table>
          <TableCaption>A list of all club resources.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Chapter</TableHead>
              <TableHead>Access</TableHead>
              <TableHead>Uploaded By</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resources.map((resource) => (
              <TableRow key={resource.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 mr-3 p-2 rounded ${
                      resource.type === 'PDF' ? 'bg-red-100 text-red-600' :
                      resource.type === 'PPT' ? 'bg-orange-100 text-orange-600' :
                      resource.type === 'DOC' ? 'bg-blue-100 text-blue-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {resource.type === 'Code' ? <File className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                    </div>
                    {resource.name}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{resource.type}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={
                    resource.chapter === 'IEEE' ? 'default' : 
                    resource.chapter === 'ACM' ? 'secondary' : 
                    'outline'
                  }>
                    {resource.chapter}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Lock className="h-4 w-4 mr-1" />
                    <span className="text-sm">{resource.access}</span>
                  </div>
                </TableCell>
                <TableCell>{resource.uploadedBy}</TableCell>
                <TableCell>{resource.date}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">View</Button>
                  <Button variant="ghost" size="sm">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </PageLayout>
  );
};

// Sample data
const resources = [
  {
    id: 1,
    name: 'React Hooks Guide',
    type: 'PDF',
    chapter: 'IEEE',
    access: 'All Members',
    uploadedBy: 'Emily Chen',
    date: 'May 15, 2023'
  },
  {
    id: 2,
    name: 'Project Presentation',
    type: 'PPT',
    chapter: 'ACM',
    access: 'Chapter Members',
    uploadedBy: 'Alex Johnson',
    date: 'May 14, 2023'
  },
  {
    id: 3,
    name: 'HTML/CSS Tutorial',
    type: 'DOC',
    chapter: 'GDSC',
    access: 'All Members',
    uploadedBy: 'Sara Miller',
    date: 'May 12, 2023'
  },
  {
    id: 4,
    name: 'Git Cheat Sheet',
    type: 'PDF',
    chapter: 'IEEE',
    access: 'Public',
    uploadedBy: 'David Lee',
    date: 'May 10, 2023'
  },
  {
    id: 5,
    name: 'Machine Learning Demo',
    type: 'Code',
    chapter: 'ACM',
    access: 'Chapter Leaders',
    uploadedBy: 'Michael Brown',
    date: 'May 8, 2023'
  }
];

export default ResourceGovernance;
