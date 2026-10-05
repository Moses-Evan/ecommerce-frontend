import { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircle, Plus, X } from "lucide-react";
import { Address, createAddress, getAddresses } from "../../api/addressApi";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type AddressBookProps =
  | { mode: "manage"; onSelect?: never }
  | {
      mode: "select";
      onSelect: (address: Address) => void;
      selectedAddress?: Address;
    };

const emptyAddressForm = {
  label: "",
  name: "",
  contactNumber: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "",
};

function getAddressKey(address: Address) {
  return address.id ?? `${address.contactNumber}-${address.address}`;
}

export function AddressBook(props: AddressBookProps) {
  const { t } = useLanguage();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyAddressForm);

  useEffect(() => {
    getAddresses()
      .then((result) => {
        setAddresses(result);
        if (result.length === 0) setShowForm(true);
      })
      .catch(() => {
        setLoadError(t("Unable to load addresses"));
        setShowForm(true);
      })
      .finally(() => setLoading(false));
  }, [t]);

  const handleCreateAddress = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setSaveError("");
    const newAddress = {
      label: form.label.trim(),
      name: form.name.trim(),
      contactNumber: form.contactNumber.trim(),
      address: form.address.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      zip: form.zip.trim(),
      country: form.country.trim(),
    };

    try {
      const createdAddress = await createAddress(newAddress);
      const savedAddress = { ...newAddress, ...createdAddress };
      setAddresses((current) => [...current, savedAddress]);
      if (props.mode === "select") {
        props.onSelect(savedAddress);
      }
      setShowForm(false);
      setForm(emptyAddressForm);
    } catch {
      setSaveError(t("Unable to save address"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="space-y-4" aria-label={t("Addresses")}>
      <AnimatePresence mode="wait" initial={false}>
        {loading ? (
          <motion.p
            key="address-loading"
            role="status"
            className="flex items-center gap-2 text-sm text-muted-foreground"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <LoaderCircle className="h-4 w-4 animate-spin" />
            {t("Loading addresses...")}
          </motion.p>
        ) : (
          <motion.div
            key="address-list"
            className="space-y-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {addresses.length === 0 && (
              <p className="text-sm text-muted-foreground" role="status">
                {loadError || t("No addresses found")}
              </p>
            )}
            <AnimatePresence initial={false}>
              {addresses.map((address, index) => {
                const addressKey = getAddressKey(address);
                const isSelected =
                  props.mode === "select" &&
                  props.selectedAddress != null &&
                  getAddressKey(props.selectedAddress) === addressKey;
                const content = (
                  <>
                    {address.label && (
                      <span className="mb-2 inline-flex rounded-sm bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                        {address.label}
                      </span>
                    )}
                    <span className="block font-medium">{address.name}</span>
                    <span className="mt-2 block whitespace-pre-wrap text-sm">
                      {[
                        address.address,
                        [address.city, address.state, address.zip]
                          .filter(Boolean)
                          .join(", "),
                        address.country,
                      ]
                        .filter(Boolean)
                        .join("\n")}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {t("Phone Number")}: {address.contactNumber}
                    </span>
                  </>
                );

                return (
                  <motion.div
                    key={addressKey}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, delay: index * 0.04 }}
                  >
                    {props.mode === "select" ? (
                      <button
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => {
                          props.onSelect(address);
                        }}
                        className={`w-full rounded-md border p-5 text-left transition-colors cursor-pointer ${isSelected ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-border bg-card hover:border-primary/50"}`}
                      >
                        {content}
                      </button>
                    ) : (
                      <article className="rounded-md border border-border bg-card p-5">
                        {content}
                      </article>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
            {!showForm && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSaveError("");
                    setShowForm(true);
                  }}
                >
                  <Plus className="h-4 w-4" />
                  {addresses.length > 0
                    ? t("Add New Address")
                    : t("Add Address")}
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {!loading && showForm && (
          <motion.form
            key="address-form"
            onSubmit={handleCreateAddress}
            className="space-y-4 overflow-hidden rounded-md border border-border bg-card p-6"
            initial={{ opacity: 0, y: 14, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 10, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <h3 className="text-lg">{t("Add an address")}</h3>
            {saveError && (
              <p className="text-sm text-destructive" role="alert">
                {saveError}
              </p>
            )}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="saved-address-label">
                  {t("Address label")}
                </Label>
                <Input
                  id="saved-address-label"
                  autoComplete="off"
                  placeholder={t("e.g. Home, Office")}
                  required
                  value={form.label}
                  onChange={(event) =>
                    setForm({ ...form, label: event.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="saved-address-name">{t("Name")}</Label>
                <Input
                  id="saved-address-name"
                  autoComplete="name"
                  required
                  value={form.name}
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="saved-address-phone">
                  {t("Contact Number")}
                </Label>
                <Input
                  id="saved-address-phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={form.contactNumber}
                  onChange={(event) =>
                    setForm({ ...form, contactNumber: event.target.value })
                  }
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="saved-address-line">{t("Address")}</Label>
                <Input
                  id="saved-address-line"
                  autoComplete="address-line1"
                  required
                  value={form.address}
                  onChange={(event) =>
                    setForm({ ...form, address: event.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="saved-address-city">{t("City")}</Label>
                <Input
                  id="saved-address-city"
                  autoComplete="address-level2"
                  required
                  value={form.city}
                  onChange={(event) =>
                    setForm({ ...form, city: event.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="saved-address-state">{t("State")}</Label>
                <Input
                  id="saved-address-state"
                  autoComplete="address-level1"
                  required
                  value={form.state}
                  onChange={(event) =>
                    setForm({ ...form, state: event.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="saved-address-postal">{t("Zip")}</Label>
                <Input
                  id="saved-address-postal"
                  autoComplete="postal-code"
                  required
                  value={form.zip}
                  onChange={(event) =>
                    setForm({ ...form, zip: event.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="saved-address-country">{t("Country")}</Label>
                <Input
                  id="saved-address-country"
                  autoComplete="country-name"
                  required
                  value={form.country}
                  onChange={(event) =>
                    setForm({ ...form, country: event.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                type="submit"
                size="default"
                className="mt-0 h-10 min-w-36 py-2"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    {t("Saving...")}
                  </>
                ) : (
                  t("Save Address")
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="default"
                className="mt-0 h-10 min-w-28 py-2"
                disabled={saving}
                onClick={() => {
                  setSaveError("");
                  setShowForm(false);
                  setForm(emptyAddressForm);
                }}
              >
                <X className="h-4 w-4" />
                {t("Cancel")}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </section>
  );
}
