import { useState } from "react";
import { Calendar, Users, Mail, User, MapPin, DollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

// 🔌 Supabase setup (replace with your keys)
const supabase = createClient(
  "https://YOUR_PROJECT.supabase.co",
  "YOUR_PUBLIC_ANON_KEY"
);

export default function QuickBookingMultiStep() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    travelers: "",
    destination: "",
    checkIn: "",
    checkOut: "",
    budget: "",
  });

  interface FormData {
    name: string;
    email: string;
    travelers: string;
    destination: string;
    checkIn: string;
    checkOut: string;
    budget: string;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.from("bookings").insert([form]);
      if (error) throw error;
      alert("Request submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full flex justify-center px-4 -mt-16 relative z-10">
      <div className="w-full max-w-4xl bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-4 md:p-6">

        {/* STEP INDICATOR */}
        <div className="flex justify-between mb-4 text-sm text-gray-600">
          <span className={step === 1 ? "font-bold" : ""}>1. Info</span>
          <span className={step === 2 ? "font-bold" : ""}>2. Trip</span>
          <span className={step === 3 ? "font-bold" : ""}>3. Budget</span>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
            >
              <Input icon={<User />} name="name" placeholder="Full Name" onChange={handleChange} />
              <Input icon={<Mail />} name="email" placeholder="Email" onChange={handleChange} />

              <button className="btn col-span-1 md:col-span-2" onClick={next}>
                Next
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-3"
            >
              <Input icon={<Users />} name="travelers" placeholder="Travelers" onChange={handleChange} />

              <select name="destination" onChange={handleChange} className="input col-span-1">
                <option>Select Destination</option>
                <option>Kenya</option>
                <option>Tanzania</option>
                <option>Uganda</option>
                <option>Rwanda</option>
              </select>

              <div className="relative">
                <input type="date" name="checkIn" onChange={handleChange} className="input pr-10" />
                <Calendar className="icon" />
              </div>

              <div className="relative">
                <input type="date" name="checkOut" onChange={handleChange} className="input pr-10" />
                <Calendar className="icon" />
              </div>

              <div className="col-span-2 md:col-span-3 flex gap-2">
                <button className="btn-secondary w-1/2" onClick={prev}>Back</button>
                <button className="btn w-1/2" onClick={next}>Next</button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="grid grid-cols-1 gap-3"
            >
              <Input icon={<DollarSign />} name="budget" placeholder="Budget ($)" onChange={handleChange} />

              <div className="flex gap-2">
                <button className="btn-secondary w-1/2" onClick={prev}>Back</button>
                <button className="btn w-1/2" onClick={handleSubmit}>
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 10px 12px 10px 36px;
          border-radius: 10px;
          background: #b88a4a;
          color: white;
          font-size: 14px;
          outline: none;
        }

        .input::placeholder {
          color: #f3e9dc;
        }

        .icon {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: white;
          width: 16px;
        }

        .btn {
          background: #1f2d2f;
          color: white;
          border-radius: 12px;
          padding: 10px;
        }

        .btn-secondary {
          background: #ccc;
          border-radius: 12px;
          padding: 10px;
        }
      `}</style>
    </section>
  );
}

interface InputProps {
  icon?: React.ReactNode;
  [key: string]: any;
}

function Input({ icon, ...props }: InputProps) {
  return (
    <div className="relative">
      {icon && <div className="icon">{icon}</div>}
      <input {...props} className="input" />
    </div>
  );
}
