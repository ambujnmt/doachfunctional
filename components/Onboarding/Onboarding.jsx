"use client";
import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { Link } from "@heroui/react";
import HamburgerMenu from "../HomePage/HamburgerMenu";
import HomeFooter from "../HomePage/HomeFooter";
import { useRouter } from "next/router";
import { onboardingUser } from "../../utils/fetchApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    handle: "",
    height: "",
    weight: "",
    age: "",
    primarySport: "",
    skillLevel: "",
    trainingGoals: [],
    email: "",
    phone: "",
    notifications: false,
    billing: "",
    payments: "",
    subscriptions: "",
    teams: [],
    groups: [],
    challenges: [],
    name: "",
    position: "",
    level: "",
    goal: "",
    mode: "training",
  });
  const [selectedSkills, setSelectedSkills] = useState([]);

  const skills = [
    { name: "Shooting", desc: "Build consistency & range" },
    { name: "Defending", desc: "Positioning, footwork, IQ" },
    { name: "Passing", desc: "Vision, accuracy, touch" },
    { name: "Ball Handling", desc: "Control, change of pace" },
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user?.onboarding_complete === 1) router.replace("/customer/dashboard");
  }, [router]);

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(0, s - 1));

  const finish = async () => {
    try {
      const u = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = localStorage.getItem("userId");

      const payload = {
        ...form,
        skills: selectedSkills,
        user_id: userId,
      };

      const data = await onboardingUser(payload);

      const updatedUser = {
        ...u,
        ...data.data,
        skills: JSON.parse(data.data.skills || "[]"),
        onboarding_complete: true,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      router.push("/customer/community");
    } catch (err) {
      const response = err.response?.data;
      if (response?.errors) {
        alert(JSON.stringify(response.errors));
      } else if (response?.message) {
        alert(response.message);
      } else {
        toast.error("Onboarding failed. Please complete your form step.");
      }
    }
  };

  return (
    <div className="custom-gradient min-h-screen flex flex-col justify-between bg-black text-white">
      <HamburgerMenu />
      <Container maxWidth="sm" className="flex-grow flex flex-col items-center justify-center px-6 py-10 space-y-8">
        <Link href="/">
          <img
            src="https://nmtdevserver.com/doach/logo.png"
            alt="DOACH Logo"
            className="w-[40%] mx-auto"
          />
        </Link>
        <div className="w-full">
          <div className="h-2 bg-gray-700 rounded-full">
            <div
              className="h-2 bg-yellow-400 rounded-full transition-all"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
          <p className="text-sm mt-2 text-gray-300">Step {step + 1} of 5</p>
        </div>
        {step === 0 && (
          <div className="w-full space-y-5 mt-5">
            <p className="text-center text-lg font-medium">Create Your Player Profile</p>
            <input
              type="text"
              placeholder="Player Handle"
              value={form.handle}
              onChange={(e) => setForm({ ...form, handle: e.target.value })}
              className="w-full px-4 py-2 rounded-md border border-gray-500 bg-transparent text-white placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Height (ft'in)"
              value={form.height}
              onChange={(e) => setForm({ ...form, height: e.target.value })}
              className="w-full px-4 py-2 rounded-md border border-gray-500 bg-transparent text-white placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Weight (lbs)"
              value={form.weight}
              onChange={(e) => setForm({ ...form, weight: e.target.value })}
              className="w-full px-4 py-2 rounded-md border border-gray-500 bg-transparent text-white placeholder-gray-400"
            />
            <input
              type="number"
              placeholder="Age"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              className="w-full px-4 py-2 rounded-md border border-gray-500 bg-transparent text-white placeholder-gray-400"
            />
            <select
              value={form.primarySport}
              onChange={(e) => setForm({ ...form, primarySport: e.target.value })}
              className="w-full px-4 py-2 rounded-md border border-gray-500 bg-transparent text-white placeholder-gray-400"
            >
              <option value="">Select Primary Sport</option>
              {["Basketball", "Volleyball", "Golf", "Soccer", "Tennis"].map((sport) => (
                <option key={sport} value={sport}>{sport}</option>
              ))}
            </select>
            <select
              value={form.skillLevel}
              onChange={(e) => setForm({ ...form, skillLevel: e.target.value })}
              className="w-full px-4 py-2 rounded-md border border-gray-500 bg-transparent text-white placeholder-gray-400"
            >
              <option value="">Select Skill Level</option>
              {["Beginner", "Intermediate", "Advanced", "Elite"].map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
            <div className="flex flex-wrap gap-2 mt-2">
              {["Shooting", "Conditioning", "Footwork", "Ball Handling", "Defense", "Strength"].map((goal) => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => {
                    setForm((prev) => ({
                      ...prev,
                      trainingGoals: prev.trainingGoals.includes(goal)
                        ? prev.trainingGoals.filter((g) => g !== goal)
                        : [...prev.trainingGoals, goal],
                    }));
                  }}
                  className={`px-3 py-1 rounded-full border ${
                    form.trainingGoals.includes(goal)
                      ? "bg-yellow-400 text-black"
                      : "border-gray-500 text-white"
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button onClick={next} className="px-6 py-2 rounded-full bg-yellow-400 text-black font-semibold hover:bg-yellow-300">
                Next
              </button>
            </div>
          </div>
        )}
        {step === 1 && (
          <div className="w-full space-y-5 mt-5">
            <p className="text-center text-lg font-medium">Contact & Membership</p>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={form.notifications}
                onChange={(e) => setForm({ ...form, notifications: e.target.checked })}
                className="w-5 h-5 text-yellow-400"
              />
              <span>Enable Notifications</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2 rounded-md border border-gray-500 bg-transparent text-white placeholder-gray-400"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-2 rounded-md border border-gray-500 bg-transparent text-white placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Billing Info"
              value={form.billing}
              onChange={(e) => setForm({ ...form, billing: e.target.value })}
              className="w-full px-4 py-2 rounded-md border border-gray-500 bg-transparent text-white placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Payment Info"
              value={form.payments}
              onChange={(e) => setForm({ ...form, payments: e.target.value })}
              className="w-full px-4 py-2 rounded-md border border-gray-500 bg-transparent text-white placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Subscriptions"
              value={form.subscriptions}
              onChange={(e) => setForm({ ...form, subscriptions: e.target.value })}
              className="w-full px-4 py-2 rounded-md border border-gray-500 bg-transparent text-white placeholder-gray-400"
            />
            <div className="flex justify-between mt-4">
              <button onClick={back} className="px-6 py-2 rounded-full border border-gray-500">Back</button>
              <button onClick={next} className="px-6 py-2 rounded-full bg-yellow-400 text-black font-semibold hover:bg-yellow-300">Next</button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="w-full space-y-5 mt-5">
            <p className="text-center text-lg font-medium">Personal & Team Info</p>
            <input
              type="text"
              placeholder="What’s your name?"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2 rounded-md border border-gray-500 bg-transparent text-white placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="What is your position?"
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
              className="w-full px-4 py-2 rounded-md border border-gray-500 bg-transparent text-white placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="What level have you played at?"
              value={form.level}
              onChange={(e) => setForm({ ...form, level: e.target.value })}
              className="w-full px-4 py-2 rounded-md border border-gray-500 bg-transparent text-white placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="What do you want to improve the most?"
              value={form.goal}
              onChange={(e) => setForm({ ...form, goal: e.target.value })}
              className="w-full px-4 py-2 rounded-md border border-gray-500 bg-transparent text-white placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Teams (comma separated)"
              value={form.teams.join(",")}
              onChange={(e) => setForm({ ...form, teams: e.target.value.split(",").map(s => s.trim()) })}
              className="w-full px-4 py-2 rounded-md border border-gray-500 bg-transparent text-white placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Groups (comma separated)"
              value={form.groups.join(",")}
              onChange={(e) => setForm({ ...form, groups: e.target.value.split(",").map(s => s.trim()) })}
              className="w-full px-4 py-2 rounded-md border border-gray-500 bg-transparent text-white placeholder-gray-400"
            />
            <div className="flex justify-between mt-4">
              <button onClick={back} className="px-6 py-2 rounded-full border border-gray-500">Back</button>
              <button onClick={next} className="px-8 py-2 rounded-full bg-yellow-400 text-black font-semibold">Next</button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="w-full space-y-5 mt-5">
            <p className="text-center text-lg font-medium">What skill do you want to sharpen?</p>
            <div className="grid grid-cols-2 gap-3 mt-6">
              {skills.map((skill, i) => (
                <label key={i} className="bg-[#111] p-4 rounded-lg flex flex-col cursor-pointer">
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedSkills.includes(skill.name)}
                      onChange={() => {
                        setSelectedSkills((prev) =>
                          prev.includes(skill.name) ? prev.filter((s) => s !== skill.name) : [...prev, skill.name]
                        );
                      }}
                      className="form-checkbox h-5 w-5 text-yellow-400 mt-1"
                    />
                    <div>
                      <h4 className="font-semibold">{skill.name}</h4>
                      <p className="text-xs text-gray-400">{skill.desc}</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
            <div className="space-y-2">
              <p className="text-md font-medium mt-4">Choose your mode:</p>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="mode"
                    value="training"
                    checked={form.mode === "training"}
                    onChange={(e) => setForm({ ...form, mode: e.target.value })}
                    className="form-radio h-5 w-5 text-yellow-400"
                  />
                  <span>Training Mode</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="mode"
                    value="community"
                    checked={form.mode === "community"}
                    onChange={(e) => setForm({ ...form, mode: e.target.value })}
                    className="form-radio h-5 w-5 text-yellow-400"
                  />
                  <span>Community Mode</span>
                </label>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button onClick={back} className="px-6 py-2 rounded-full border border-gray-500">Back</button>
              <button onClick={next} className="px-8 py-2 rounded-full bg-yellow-400 text-black font-semibold">Start Drill</button>
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="w-full space-y-6 mt-5 text-center">
            <div className="bg-[#111] p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold text-yellow-400">🎉 You're All Set!</h2>
              <p className="mt-2 text-gray-300">
                Welcome aboard, {form.name || "Player"}! Your profile is ready and drills are customized for you.
              </p>
            </div>
            <div className="bg-[#111] p-5 rounded-lg text-left space-y-2">
              <h3 className="text-lg font-semibold text-yellow-400">Player Profile</h3>
              <p><span className="font-medium">Handle:</span> {form.handle || "-"}</p>
              <p><span className="font-medium">Height:</span> {form.height || "-"}</p>
              <p><span className="font-medium">Weight:</span> {form.weight || "-"}</p>
              <p><span className="font-medium">Age:</span> {form.age || "-"}</p>
              <p><span className="font-medium">Sport:</span> {form.primarySport || "-"}</p>
              <p><span className="font-medium">Skill Level:</span> {form.skillLevel || "-"}</p>
              <p><span className="font-medium">Training Goals:</span> {form.trainingGoals.length > 0 ? form.trainingGoals.join(", ") : "-"}</p>
            </div>
            <div className="bg-[#111] p-5 rounded-lg text-left space-y-2">
              <h3 className="text-lg font-semibold text-yellow-400">Personal Info</h3>
              <p><span className="font-medium">Name:</span> {form.name || "-"}</p>
              <p><span className="font-medium">Position:</span> {form.position || "-"}</p>
              <p><span className="font-medium">Played Level:</span> {form.level || "-"}</p>
              <p><span className="font-medium">Main Goal:</span> {form.goal || "-"}</p>
            </div>
            <div className="bg-[#111] p-5 rounded-lg text-left space-y-2">
              <h3 className="text-lg font-semibold text-yellow-400">Contact & Teams</h3>
              <p><span className="font-medium">Email:</span> {form.email || "-"}</p>
              <p><span className="font-medium">Phone:</span> {form.phone || "-"}</p>
              <p><span className="font-medium">Notifications:</span> {form.notifications ? "Enabled" : "Disabled"}</p>
              <p><span className="font-medium">Teams:</span> {form.teams.length > 0 ? form.teams.join(", ") : "-"}</p>
              <p><span className="font-medium">Groups:</span> {form.groups.length > 0 ? form.groups.join(", ") : "-"}</p>
              <p><span className="font-medium">Challenges:</span> {form.challenges.length > 0 ? form.challenges.join(", ") : "-"}</p>
            </div>
            <div className="bg-[#111] p-5 rounded-lg text-left">
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">Skills to Focus On</h3>
              {selectedSkills.length > 0 ? (
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  {selectedSkills.map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">No skills selected</p>
              )}
            </div>
            <button onClick={back} className="px-6 py-2 rounded-full border border-gray-500 text-dark ">Back</button>
            <button
              onClick={finish}
              className="w-full bg-yellow-400 text-black rounded-full py-3 font-semibold hover:bg-yellow-300"
            >
              Set And Go to Dashboard
            </button>
          </div>
        )}
      </Container>
      <HomeFooter />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}