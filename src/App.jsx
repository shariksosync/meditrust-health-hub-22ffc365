import { useApp, AppProvider } from "./context/AppContext";
import { Footer, Header } from "./components/Layout";
import { A, Icon, Toasts, matchRoute, useLoc } from "./components/ui";
import * as S from "./pages/shop";
import * as V from "./pages/services";
import * as U from "./pages/account";
import { AdminLogin, AdminShell, adminRoutes } from "./pages/admin";

const info = ["about", "privacy-policy", "terms", "shipping-policy", "returns-policy", "careers", "healthcare-disclaimer"];
const routes = [
  ["/", S.Home],
  ["/medicines", (p) => <S.Listing {...p} base="medicines"/>], ["/medicines/:category", (p) => <S.Listing {...p} base="medicines"/>],
  ["/healthcare", (p) => <S.Listing {...p} base="healthcare"/>], ["/healthcare/:category", (p) => <S.Listing {...p} base="healthcare"/>],
  ["/search", (p) => <S.Listing {...p} base="search"/>],
  ["/product/:id", S.Product], ["/prescription-upload", S.PrescriptionUpload], ["/cart", S.Cart], ["/checkout", S.Checkout],
  ["/order-confirmation", S.OrderConfirmation], ["/orders", S.Orders], ["/orders/:id", S.OrderDetail],
  ["/lab-tests", V.LabTests], ["/lab-tests/booking", V.LabBooking], ["/lab-tests/booking-confirmation", V.LabConfirm], ["/lab-tests/:id", V.LabTest],
  ["/consult-doctor", V.Consult], ["/doctors/:specialty", V.Specialty], ["/doctor/:id", V.Doctor], ["/consultation/booking", V.ConsultBooking], ["/consultation/confirmation", V.ConsultConfirm],
  ["/health-articles", V.Articles], ["/health-articles/:slug", V.Article],
  ["/login", U.Login], ["/register", U.Register], ["/forgot-password", U.Forgot], ["/profile", U.Profile], ["/addresses", U.Addresses], ["/wishlist", U.Wishlist],
  ["/contact", V.Contact], ["/faq", V.Faq], ["/offers", V.Offers],
  ...info.map((id) => [`/${id}`, () => <V.InfoPage id={id}/>]),
];

function Routes() {
  const { path } = useLoc();
  const { state, ready } = useApp();
  if (path === "/admin/login") return <AdminLogin/>;
  if (path.startsWith("/admin")) {
    const Page = adminRoutes[path];
    if (!ready) return <div className="grid min-h-screen place-items-center text-muted-foreground">Loading…</div>;
    if (!state.admin) return <AdminLogin/>;
    return <AdminShell>{Page ? <Page/> : <div className="card p-10 text-center"><p className="font-semibold">Admin page not found</p><A href="/admin/dashboard" className="btn btn-primary mt-4">Back to dashboard</A></div>}</AdminShell>;
  }
  const m = matchRoute(routes, path);
  const Page = m?.Comp || S.NotFound;
  const count = state.cart.reduce((s, c) => s + c.quantity, 0);
  return <div className="flex min-h-screen flex-col"><Header/><main className="flex-1"><Page key={path} params={m?.params || {}}/></main><Footer/>
    {count > 0 && !["/cart", "/checkout"].includes(path) && <A href="/cart" className="btn btn-primary fixed bottom-4 left-4 right-4 z-30 shadow-lift sm:hidden"><Icon name="cart" size={18}/>View cart · {count} item{count > 1 ? "s" : ""}</A>}
  </div>;
}

export default function App() {
  return <AppProvider><Routes/><Toasts/></AppProvider>;
}
