import { User } from "lucide-react";
import { getAuthenticatedProfile } from "../../api/auth";
import { useLanguage } from "../contexts/LanguageContext";

interface ProfileInformationProps {
  title?: string;
}

export function ProfileInformation({
  title = "Profile Information",
}: ProfileInformationProps) {
  const { t } = useLanguage();
  const profile = getAuthenticatedProfile();
  const profileValue = (value?: string) => value || t("Not provided");

  return (
    <section className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg mb-6">{t(title)}</h2>
      <div className="flex items-center gap-4 mb-6">
        {profile.picture ? (
          <img
            src={profile.picture}
            alt={profile.name || t("Profile")}
            className="h-16 w-16 rounded-full object-cover"
          />
        ) : (
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
            <User className="h-8 w-8 text-muted-foreground" />
          </div>
        )}
        <div>
          <h3 className="font-medium">{profileValue(profile.name)}</h3>
          <p className="text-sm text-muted-foreground">
            {profileValue(profile.email)}
          </p>
        </div>
      </div>
      <dl className="grid gap-5 sm:grid-cols-2">
        <div>
          <dt className="text-sm text-muted-foreground">{t("First Name")}</dt>
          <dd className="mt-1">{profileValue(profile.givenName)}</dd>
        </div>
        <div>
          <dt className="text-sm text-muted-foreground">{t("Last Name")}</dt>
          <dd className="mt-1">{profileValue(profile.familyName)}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-sm text-muted-foreground">{t("Email")}</dt>
          <dd className="mt-1 break-all">{profileValue(profile.email)}</dd>
        </div>
      </dl>
    </section>
  );
}
