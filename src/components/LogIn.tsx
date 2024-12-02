import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppContext } from "@/context/context";
import { Loader2 } from "lucide-react";
import { FormEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

interface FormTypes {
  email: string;
  password: string;
}

const LogIn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormTypes>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { setToken, user } = useContext(AppContext);

  useEffect(() => {
    if (user) {
      navigate("/all"); // Redirect to a different page if user is logged in
    }
  }, [user, navigate]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await fetch("/api/login", {
        method: "post",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.error) setError("Something wrong, try again");

      if (data.user && data.token) {
        localStorage.setItem("msa-token", data.token);
        if (setToken) setToken(data?.token);
        navigate("/all");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">LogIn</CardTitle>
          <CardDescription>
            Enter your email to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleLogin}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="luffy@example.com"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              {error ? <p>{error}</p> : null}
            </div>
            <Button type="submit" className="w-full">
              {isLoading ? (
                <Loader2 className="animate-spin h-3 w-3" />
              ) : (
                <span>LogIn</span>
              )}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline">
              Register
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LogIn;
