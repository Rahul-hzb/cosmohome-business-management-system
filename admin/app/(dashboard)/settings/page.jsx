import CompanyForm from "@/components/settings/company-form";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Website Settings</h1>

        <p className="text-muted-foreground">
          Manage your website information.
        </p>
      </div>

      <CompanyForm />
    </div>
  );
}
