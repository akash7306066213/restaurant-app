import { useState } from "react";
import client from "../api/client";
import { useAuth } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";
export default function LoginModal({ close }) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // const handleLogin = async () => {
  //   setErr(""); setLoading(true);
  //   try {
  //     const { data } = await client.post("/api/auth/login", {
  //       email: form.email,
  //       password: form.password,
  //     });
  //     // data = { role, name, id, email, token }
  //     login(data);
  //     // Role handling
  //     if (data.role === "ROLE_CUSTOMER") {
  //       // stay on home, just close modal
  //       close();
  //     } else {
  //       // if admin, you can navigate to admin page later
  //       navigate("/admin");
  //       close();
  //     }
  //   } catch (e) {
  //     setErr(e?.response?.data?.message || "Login failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
 const handleLogin = async () => {
  setErr(""); 
  setLoading(true);

  try {
    const res = await client.post("/api/auth/login", {
      email: form.email,
      password: form.password,
    });

    const data = res.data;  
    
    login(data);  // store in context + localstorage

    // role based redirect
    if (data.role === "ROLE_ADMIN") {
      close(); 
      navigate("/admin");
    } else {
      close(); // customer just close modal 
    }

  } catch (e) {
    console.log(e);
    setErr(e?.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};

  const handleSignup = async () => {
  setErr(""); setLoading(true);
  try {
    const { data } = await client.post("/api/auth/register", {
      name: form.name,
      email: form.email,
      password: form.password,
      role: "ROLE_CUSTOMER"  // <-- add this line
    });

    // after signup → auto switch to login
    setIsLogin(true);

  } catch (e) {
    setErr(e?.response?.data?.message || "Signup failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl w-96 shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {err && <p className="text-red-600 text-sm mb-3">{err}</p>}

        <div className="flex flex-col gap-3">
          {!isLogin && (
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={onChange}
              className="border p-2 rounded"
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange}
            className="border p-2 rounded"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange}
            className="border p-2 rounded"
          />

          <button
            disabled={loading}
            onClick={isLogin ? handleLogin : handleSignup}
            className="bg-[#FF6B35] text-white py-2 rounded font-bold disabled:opacity-60"
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </div>

        <p className="mt-4 text-center">
          {isLogin ? (
            <>
              New user?{" "}
              <button className="text-blue-600 underline" onClick={() => setIsLogin(false)}>
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button className="text-blue-600 underline" onClick={() => setIsLogin(true)}>
                Login
              </button>
            </>
          )}
        </p>

        <button onClick={close} className="mt-6 block mx-auto text-gray-600 hover:text-black">
          Close
        </button>
      </div>
    </div>
  );
}
