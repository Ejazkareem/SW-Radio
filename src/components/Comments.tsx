import React, { useState } from 'react';
import { MessageSquare, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { usePersistence } from '../hooks/usePersistence';
import { toast } from 'sonner';

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string; // Stored as string in JSON
}

export const Comments: React.FC = () => {
  const [comments, setComments] = usePersistence<Comment[]>('visitor_comments', [
    { id: '1', author: 'RadioDXer', text: 'Great to see a page for Mr. Ejaz! His knowledge of SW stations is legendary.', timestamp: new Date(Date.now() - 86400000).toISOString() },
    { id: '2', author: 'GlobalListener', text: 'I remember listening to the same stations in the 90s. Nostalgic!', timestamp: new Date(Date.now() - 3600000).toISOString() },
  ]);

  const [newAuthor, setNewAuthor] = useState('');
  const [newText, setNewText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newText) {
      toast.error('Please fill in both name and comment.');
      return;
    }
    
    const comment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      author: newAuthor,
      text: newText,
      timestamp: new Date().toISOString(),
    };
    
    setComments([comment, ...comments]);
    setNewAuthor('');
    setNewText('');
    toast.success('Comment posted successfully!');
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-primary" />
          Visitor Guestbook
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4 p-4 rounded-lg bg-background border border-border">
          <div className="space-y-2">
            <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Your Name</label>
            <Input 
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              className="bg-card border-border text-foreground focus:border-primary" 
              placeholder="Display Name" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Comment</label>
            <Textarea 
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              className="bg-card border-border text-foreground focus:border-primary min-h-[80px]" 
              placeholder="Share your thoughts..." 
            />
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
            Post Comment
          </Button>
        </form>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6">
            {comments.map((comment, index) => (
              <div key={comment.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-full bg-zinc-800 text-zinc-400">
                      <User className="w-3 h-3" />
                    </div>
                    <span className="text-sm font-bold text-zinc-200">{comment.author}</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">
                    {new Date(comment.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed pl-8">
                  {comment.text}
                </p>
                {index < comments.length - 1 && <Separator className="mt-4 bg-zinc-800/50" />}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
