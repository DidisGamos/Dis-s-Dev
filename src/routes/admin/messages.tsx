import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  MessageSquare,
  Mail,
  Building2,
  Trash2,
  CheckCircle,
  Clock,
  Briefcase,
  DollarSign,
  Loader2,
  Eye,
} from "lucide-react";
import { toast } from "sonner";
import { getContactMessages, markMessageAsRead, deleteMessage } from "@/lib/admin-actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/messages")({
  component: AdminMessages,
});

interface ContactMessageItem {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  service?: string | null;
  budget?: string | null;
  message: string;
  isRead: boolean;
  createdAt: Date | string;
}

function AdminMessages() {
  const queryClient = useQueryClient();
  const [selectedMessage, setSelectedMessage] = useState<ContactMessageItem | null>(null);

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["admin", "messages"],
    queryFn: () => getContactMessages(),
  });

  const markAsReadMutation = useMutation({
    mutationFn: (id: string) => markMessageAsRead({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "messages"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
      toast.success("Message marqué comme lu");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteMessage({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "messages"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
      if (selectedMessage) setSelectedMessage(null);
      toast.success("Message supprimé");
    },
  });

  const handleOpenMessage = (msg: ContactMessageItem) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      markAsReadMutation.mutate(msg.id);
    }
  };

  const formatDate = (dateInput: Date | string) => {
    const d = new Date(dateInput);
    return d.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-brand">
            <MessageSquare className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em]">Boîte de réception</span>
          </div>
          <h2
            className="mt-1 text-2xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Demandes de contact & Devis
          </h2>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-brand" />
        </div>
      ) : messages.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center">
          <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/40" />
          <p className="mt-4 text-sm text-muted-foreground">Aucun message de contact reçu pour l'instant.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {messages.map((m) => (
            <div
              key={m.id}
              onClick={() => handleOpenMessage(m as ContactMessageItem)}
              className={`group flex cursor-pointer items-start justify-between gap-4 rounded-2xl border p-5 transition-all duration-200 hover:border-brand/40 ${
                m.isRead
                  ? "border-border bg-surface/30 opacity-80"
                  : "border-brand/40 bg-surface/80 shadow-[0_0_20px_-10px_oklch(0.85_0.17_90/0.2)]"
              }`}
            >
              <div className="flex items-start gap-4 min-w-0">
                <div
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
                    m.isRead ? "bg-muted text-muted-foreground" : "bg-brand/20 text-brand"
                  }`}
                >
                  <Mail className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-foreground text-sm">{m.name}</span>
                    {m.company && (
                      <span className="flex items-center gap-1 rounded-md border border-border bg-surface px-2 py-0.5 text-xs text-muted-foreground">
                        <Building2 className="h-3 w-3" /> {m.company}
                      </span>
                    )}
                    {m.service && (
                      <span className="rounded-md bg-brand/10 px-2 py-0.5 text-xs font-semibold text-brand">
                        {m.service}
                      </span>
                    )}
                    {!m.isRead && (
                      <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold uppercase text-brand-foreground">
                        Nouveau
                      </span>
                    )}
                  </div>

                  <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{m.message}</p>

                  <div className="mt-2 flex items-center gap-4 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" /> {m.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {formatDate(m.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenMessage(m as ContactMessageItem);
                  }}
                  className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-brand/10 hover:text-brand"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm("Supprimer ce message ?")) deleteMutation.mutate(m.id);
                  }}
                  className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Message Details Modal */}
      <Dialog open={!!selectedMessage} onOpenChange={(open) => !open && setSelectedMessage(null)}>
        <DialogContent className="max-w-xl border-border bg-background">
          {selectedMessage && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-brand">
                    <Clock className="h-3.5 w-3.5" /> Reçu le {formatDate(selectedMessage.createdAt)}
                  </span>
                  {selectedMessage.isRead && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400" /> Lu
                    </span>
                  )}
                </div>
                <DialogTitle className="mt-2 text-2xl font-bold">
                  {selectedMessage.name}
                </DialogTitle>
              </DialogHeader>

              <div className="mt-4 space-y-4 text-sm">
                <div className="grid gap-3 sm:grid-cols-2 rounded-xl border border-border bg-surface/50 p-4">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Email</div>
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="mt-0.5 block font-semibold text-brand hover:underline"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>
                  {selectedMessage.company && (
                    <div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">Entreprise</div>
                      <div className="mt-0.5 font-semibold text-foreground flex items-center gap-1">
                        <Building2 className="h-3.5 w-3.5" /> {selectedMessage.company}
                      </div>
                    </div>
                  )}
                  {selectedMessage.service && (
                    <div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">Service</div>
                      <div className="mt-0.5 font-semibold text-foreground flex items-center gap-1">
                        <Briefcase className="h-3.5 w-3.5" /> {selectedMessage.service}
                      </div>
                    </div>
                  )}
                  {selectedMessage.budget && (
                    <div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">Budget</div>
                      <div className="mt-0.5 font-semibold text-foreground flex items-center gap-1">
                        <DollarSign className="h-3.5 w-3.5" /> {selectedMessage.budget}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Message</div>
                  <div className="rounded-xl border border-border bg-background/80 p-4 leading-relaxed whitespace-pre-wrap text-foreground">
                    {selectedMessage.message}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => {
                      if (confirm("Supprimer ce message ?")) {
                        deleteMutation.mutate(selectedMessage.id);
                      }
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-destructive/30 px-4 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Supprimer
                  </button>
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: Votre demande de projet — Dis's Dev`}
                    className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-2 text-xs font-semibold text-brand-foreground hover:shadow-[var(--shadow-glow)]"
                  >
                    <Mail className="h-3.5 w-3.5" /> Répondre par email
                  </a>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
