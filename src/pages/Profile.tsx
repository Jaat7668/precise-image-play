import { useState } from "react";
import { useProfile, useUpdateProfile } from "@/hooks/use-profile";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, Gift } from "lucide-react";
import Navbar from "@/components/Navbar";

const Profile = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [initialized, setInitialized] = useState(false);

  if (!loading && !user) {
    navigate("/auth");
    return null;
  }

  if (profile && !initialized) {
    setFullName(profile.full_name);
    setPhone(profile.phone);
    setDeliveryAddress(profile.delivery_address);
    setCity(profile.city);
    setPostalCode(profile.postal_code);
    setInitialized(true);
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile.mutateAsync({
        full_name: fullName,
        phone,
        delivery_address: deliveryAddress,
        city,
        postal_code: postalCode,
      });
      toast.success("Profile updated!");
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto max-w-lg px-4 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <h1 className="font-display text-3xl font-bold text-foreground mb-6">My Profile</h1>

        {profile && (
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-6 flex items-center gap-3">
            <Gift className="w-6 h-6 text-accent" />
            <div>
              <p className="font-semibold text-sm text-foreground">Loyalty Points</p>
              <p className="text-2xl font-bold text-accent">{profile.loyalty_points}</p>
            </div>
          </div>
        )}

        {isLoading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : (
          <form onSubmit={handleSave} className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-lg">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={user?.email ?? ""} disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 123-4567" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Delivery Address</Label>
              <Input id="address" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} placeholder="123 Main St" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input id="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={updateProfile.isPending}>
              {updateProfile.isPending ? "Saving..." : "Save Profile"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
