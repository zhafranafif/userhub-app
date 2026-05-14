import type { IUser } from "@/lib/types";
import { Globe, Mail, MapPin, Phone, Building2, Building } from "lucide-react";

interface UserCardProps {
    user: IUser;
}

export function UserCard({ user }: UserCardProps) {

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .slice(0, 2)
            .map((n) => n[0])
            .join("")
        .toUpperCase();
    }

    return (
        <div className="bg-white/80 border border-border rounded-2xl p-5 flex flex-col gap-4 w-full max-w-sm">
            <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-md font-medium shrink-0 bg-primary text-background">
                    {getInitials(user.name)}
                </div>
                <div className="min-w-0">
                <p className="font-semibold text-primary text-md truncate">{user.name}</p>
                <p className="text-sm font-medium text-primary/70 truncate">{user.email}</p>
                </div>
            </div>

            <hr className="border-border" />

            <div className="flex flex-col gap-2">
                <p className="text-md font-medium text-primary uppercase tracking-wider">
                Contact
                </p>
                <ContactRow icon={<Mail className="w-4 h-4" />} value={user.email} href={`mailto:${user.email}`} />
                <ContactRow icon={<Phone className="w-4 h-4" />} value={user.phone} />
                <ContactRow icon={<Globe className="w-4 h-4" />} value={user.website} href={`https://${user.website}`} />
            </div>
 
            <hr className="border-border" />

            <div className="flex flex-col gap-2">
                <p className="text-md font-medium text-primary uppercase tracking-wider">
                Address
                </p>
                <ContactRow
                icon={<MapPin className="w-4 h-4" />}
                value={`${user.address.street}, ${user.address.suite}`}
                />
                <ContactRow
                icon={<Building className="w-4 h-4 "/>}
                value={`${user.address.city}, ${user.address.zipcode}`}
                />
            </div>
        
            <hr className="border-border" />

            <div className="flex flex-col gap-2">
                <p className="text-md font-medium text-primary uppercase tracking-wider">
                Company
                </p>
                <div className="bg-light-primary rounded-xl px-4 py-3">
                <div className="flex items-center gap-2 mb-1">
                    <Building2 className="w-4 h-4 text-primary shrink-0" />
                    <p className="text-md font-medium text-primary">{user.company.name}</p>
                </div>
                <p className="text-sm text-primary italic">
                    &ldquo;{user.company.catchPhrase}&rdquo;
                </p>
                </div>
            </div>
    </div>
    )
}

interface ContactRowProps {
  icon: React.ReactNode;
  value: string;
  href?: string;
}
 
function ContactRow({ icon, value, href }: ContactRowProps) {
  return (
    <div className="flex items-center gap-2.5 text-sm">
      <span className="text-sm text-foreground shrink-0">{icon}</span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline truncate"
        >
          {value}
        </a>
      ) : (
        <span className="text-sm text-foreground truncate">{value}</span>
      )}
    </div>
  );
}