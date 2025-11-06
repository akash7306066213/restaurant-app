import { useState } from "react";

export default function LoginModal({ close }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl w-96">

        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form className="flex flex-col gap-4">
          {!isLogin && (
            <input type="text" placeholder="Name" className="border p-2 rounded" />
          )}
          <input type="email" placeholder="Email" className="border p-2 rounded" />
          <input type="password" placeholder="Password" className="border p-2 rounded" />

          <button className="bg-[#FF6B35] text-white py-2 rounded font-bold">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center">
          {isLogin ? (
            <>
              New user?{" "}
              <button className="text-blue-600" onClick={() => setIsLogin(false)}>Sign Up</button>
            </>
          ) : (
            <>
              Already have account?{" "}
              <button className="text-blue-600" onClick={() => setIsLogin(true)}>Login</button>
            </>
          )}
        </p>

        <button onClick={close} className="mt-4 block mx-auto text-gray-500 hover:text-black">
          Close
        </button>
      </div>
    </div>
  );
}
