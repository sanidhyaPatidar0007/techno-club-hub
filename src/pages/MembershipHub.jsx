
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Badge } from '@/components/ui/badge';
import { Search, UserPlus } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

const MembershipHub = () => {
  const actionButtons = (
    <>
      <Button size="sm" variant="outline">
        <Search className="mr-2 h-4 w-4" />
        Filter Members
      </Button>
      <Button size="sm">
        <UserPlus className="mr-2 h-4 w-4" />
        Add Member
      </Button>
    </>
  );

  return (
    <PageLayout 
      title="Membership Hub" 
      description="Manage members across multiple chapters"
      backgroundImage="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=10"
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
            placeholder="Search members..." 
            className="w-full"
          />
        </div>
        <div className="flex gap-4">
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
                
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="member">Member</SelectItem>
              <SelectItem value="leader">Chapter Leader</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>
            
      {/* Members Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="rounded-md border shadow-sm overflow-hidden bg-white/80 backdrop-blur-sm"
      >
        <Table>
          <TableCaption>A list of all club members.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Chapter</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Credits</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold mr-3">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    {member.name}
                  </div>
                </TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {member.chapters.map((chapter, i) => (
                      <Badge key={i} variant={
                        chapter === 'IEEE' ? 'default' : 
                        chapter === 'ACM' ? 'secondary' : 
                        'outline'
                      }>
                        {chapter}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={
                    member.role === 'Admin' ? 'destructive' : 
                    member.role === 'Chapter Leader' ? 'default' : 
                    'outline'
                  }>
                    {member.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="font-semibold">{member.credits}</span>
                </TableCell>
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
const members = [
  {
    id: 1,
    name: 'Aditya Sharma',
    email: 'aditya@example.com',
    chapters: ['IEEE', 'ACM'],
    role: 'Admin',
    credits: 520
  },
  {
    id: 2,
    name: 'Priya Patel',
    email: 'priya@example.com',
    chapters: ['IEEE'],
    role: 'Chapter Leader',
    credits: 480
  },
  {
    id: 3,
    name: 'Rahul Verma',
    email: 'rahul@example.com',
    chapters: ['GDSC'],
    role: 'Member',
    credits: 350
  },
  {
    id: 4,
    name: 'Neha Singh',
    email: 'neha@example.com',
    chapters: ['ACM', 'GDSC'],
    role: 'Member',
    credits: 420
  },
  {
    id: 5,
    name: 'Vikram Reddy',
    email: 'vikram@example.com',
    chapters: ['IEEE'],
    role: 'Member',
    credits: 280
  }
];

export default MembershipHub;
