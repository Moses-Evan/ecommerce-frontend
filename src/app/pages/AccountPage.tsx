import { Package, Heart, MapPin, User, LogOut } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigation } from "../contexts/NavigationContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export function AccountPage() {
  const { navigate } = useNavigation();

  const orders = [
    {
      id: "DV12345",
      date: "March 15, 2025",
      status: "Delivered",
      total: 8999,
      items: 1
    },
    {
      id: "DV12344",
      date: "March 10, 2025",
      status: "In Transit",
      total: 15999,
      items: 2
    },
    {
      id: "DV12343",
      date: "March 5, 2025",
      status: "Processing",
      total: 4999,
      items: 1
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl mb-2">My Account</h1>
          <p className="text-muted-foreground">Manage your orders and account settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 space-y-2">
              <button className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-muted/30 transition-colors text-left">
                <Package className="h-5 w-5" />
                <span>My Orders</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-muted/30 transition-colors text-left">
                <Heart className="h-5 w-5" />
                <span>Wishlist</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-muted/30 transition-colors text-left">
                <MapPin className="h-5 w-5" />
                <span>Addresses</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-muted/30 transition-colors text-left">
                <User className="h-5 w-5" />
                <span>Profile</span>
              </button>
              <button 
                onClick={() => navigate("login")}
                className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-destructive/10 hover:text-destructive transition-colors text-left"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="orders">
              <TabsList className="mb-6">
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                <TabsTrigger value="addresses">Addresses</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
              </TabsList>

              <TabsContent value="orders">
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-card border border-border rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg mb-1">Order #{order.id}</h3>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          order.status === "Delivered" ? "bg-green-100 text-green-700" :
                          order.status === "In Transit" ? "bg-blue-100 text-blue-700" :
                          "bg-yellow-100 text-yellow-700"
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">{order.items} item(s)</p>
                          <p className="text-primary mt-1">₹{order.total.toLocaleString()}</p>
                        </div>
                        <Button variant="outline">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="wishlist">
                <div className="text-center py-12">
                  <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Your wishlist is empty</p>
                  <Button onClick={() => navigate("category", { category: "all" })} variant="outline" className="mt-4">
                    Browse Products
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="addresses">
                <div className="space-y-4">
                  <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg">Home</h3>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Delete</Button>
                      </div>
                    </div>
                    <p className="text-sm">
                      123 Silk Street<br />
                      Mumbai, Maharashtra 400001<br />
                      Phone: +91 98765 43210
                    </p>
                  </div>
                  <Button variant="outline" className="w-full">
                    + Add New Address
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="profile">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg mb-6">Profile Information</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="profile-firstName">First Name</Label>
                        <Input id="profile-firstName" defaultValue="Priya" />
                      </div>
                      <div>
                        <Label htmlFor="profile-lastName">Last Name</Label>
                        <Input id="profile-lastName" defaultValue="Sharma" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="profile-email">Email</Label>
                      <Input id="profile-email" type="email" defaultValue="priya@example.com" />
                    </div>
                    <div>
                      <Label htmlFor="profile-phone">Phone</Label>
                      <Input id="profile-phone" type="tel" defaultValue="+91 98765 43210" />
                    </div>
                    <div className="pt-4 border-t border-border">
                      <h4 className="mb-4">Change Password</h4>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div>
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div>
                          <Label htmlFor="confirm-new-password">Confirm New Password</Label>
                          <Input id="confirm-new-password" type="password" />
                        </div>
                      </div>
                    </div>
                    <Button type="submit" className="w-full">Save Changes</Button>
                  </form>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
