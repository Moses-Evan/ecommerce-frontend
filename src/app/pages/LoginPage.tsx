import { Button } from "../components/ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import { getGoogleAuthUrl } from "../../api/auth";

export function LoginPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl mb-4">{t("Welcome Back")}</h1>
            <p className="text-muted-foreground">{t("Sign in to continue")}</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              size="lg"
              onClick={() => window.location.assign(getGoogleAuthUrl())}
            >
              {t("Continue with Google")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
