import React from 'react';
import { Mail, Phone, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export const ContactSection: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thank you! Your message has been sent to Mr. Ejaz Kareem.');
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary" />
            Get in Touch
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-background border border-border">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Phone Number</div>
                <div className="text-sm font-mono">+92 300 4102081</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 rounded-lg bg-background border border-border">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Email Address</div>
                <div className="text-sm font-mono">ejazkareem52@gmail.com</div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Mr. Ejaz Kareem has been a dedicated Shortwave (SW) radio listener since 1990. 
              Feel free to reach out for discussions regarding DXing, radio stations, and the world of SW broadcasting.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Send a Message</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Name</label>
                <Input required className="bg-background border-border text-foreground focus:border-primary" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Email</label>
                <Input required type="email" className="bg-background border-border text-foreground focus:border-primary" placeholder="your@email.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Message</label>
              <Textarea required className="bg-background border-border text-foreground focus:border-primary min-h-[120px]" placeholder="Write your message here..." />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
