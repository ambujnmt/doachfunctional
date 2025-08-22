import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { Link } from "@heroui/react";
import HamburgerMenu from "../HomePage/HamburgerMenu";
import HomeFooter from "../HomePage/HomeFooter";
import { BsChevronRight } from "react-icons/bs";
import { useRouter } from "next/router";
import { onboardingUser } from "../../utils/fetchApi";


export default function Onboarding() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [form, setForm] = useState({
      name: "",
      age: "",
      position: "",
      level: "",
      goal: "",
      mode: "",
    });

    const skills = [
      { name: "Shooting", desc: "Build consistency & range" },
      { name: "Defending", desc: "Positioning, footwork, IQ" },
      { name: "Passing", desc: "Vision, accuracy, touch" },
      { name: "Ball Handling", desc: "Control, change of pace" },
    ];
    const [selectedSkills, setSelectedSkills] = useState([]);
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user?.onboarding_complete == 1) router.replace("/customer/dashboard");
    }, [router]);

    const next = () => setStep((s) => Math.min(3, s + 1));
    const back = () => setStep((s) => Math.max(0, s - 1));

    const finish = async () => {
      if (step < 3) {
        setStep(3);
        return;
      }

    try {
      const u = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = localStorage.getItem("userId");

      const payload = {
        ...form,
        skills: selectedSkills,
        user_id: userId,
        mode: form.mode === "Training Mode" ? "training" : "community",
      };

      const data = await onboardingUser(payload); // call API

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
        setErrors(response.errors); // Save backend errors
      } else if (response?.message) {
        alert(response.message);
      } else {
        alert("Onboarding failed. Please complete your form step.");
      }
    }
  };

  return (
    <div className="custom-gradient min-h-screen flex flex-col justify-between bg-black text-white">
      <HamburgerMenu />

      <Container
        maxWidth="sm"
        className="flex-grow flex flex-col items-center justify-center px-6 py-10 space-y-8"
      >
        {/* Logo */}
        <Link href="/">
          <img
            src="https://nmtdevserver.com/doach/logo.png"
            alt="DOACH Logo"
            className="w-[40%] mx-auto"
          />
        </Link>

        {/* Progress (updated for 4 steps) */}
        <div className="w-full">
          <div className="h-2 bg-gray-700 rounded-full">
            <div
              className="h-2 bg-yellow-400 rounded-full transition-all"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
          <p className="text-sm mt-2 text-gray-300">Step {step + 1} of 4</p>
        </div>

        {/* STEP 0 — Welcome */}
        {step === 0 && (
        <>
            <div className="w-full">
            <Link
                href="#"
                className="flex items-center justify-between py-3 border-b border-gray-500 text-lg font-medium text-white"
            >
                See what's poppin’
                <BsChevronRight size={20} />
            </Link>
            </div>

            <div className="w-full text-center space-y-2">
            <p className="text-[22px] font-medium">Streak: 3 Days</p>
            <hr className="border-b border-gray-500" />
            </div>

            <div className="w-full mb-5">
            <Link
                href="#"
                className="flex items-center justify-between py-3 text-sm text-white"
            >
                Customize Your Home Screen
                <BsChevronRight size={20} />
            </Link>
            </div>

            {/* ✅ Radio Buttons */}
            <div className="w-full flex flex-col space-y-4 mt-4">
            <label className="flex items-center space-x-3 cursor-pointer">
                <input
                type="radio"
                name="mode"
                value="Training Mode"
                checked={form.mode === "Training Mode"}
                onChange={(e) => setForm({ ...form, mode: e.target.value })}
                className="w-5 h-5 text-yellow-400"
                />
                <span className="text-base">Training Mode</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
                <input
                type="radio"
                name="mode"
                value="Community Mode"
                checked={form.mode === "Community Mode"}
                onChange={(e) => setForm({ ...form, mode: e.target.value })}
                className="w-5 h-5 text-yellow-400"
                />
                <span className="text-base">Community Mode</span>
            </label>
            </div>

            <button
            onClick={next}
            disabled={!form.mode}   // ✅ disable until selected
            className={`w-[50%] rounded-full py-2 mt-10 text-lg font-semibold ${
                form.mode
                ? "bg-yellow-400 text-black hover:bg-yellow-300"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
            }`}
            >
            Start Drill
            </button>
        </>
        )}


        {/* STEP 1 — Profile form (part 1) */}
        {step === 1 && (
          <div className="w-full space-y-5 mt-5">
            <p className="text-center text-lg font-medium">
              “Let’s build your profile”
            </p>

            <input
              type="text"
              placeholder="What’s your name?"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2 rounded-md border border-gray-500 bg-transparent text-white placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="How old are you?"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
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

            <div className="flex items-center justify-between mt-4">
              <button
                onClick={back}
                className="px-6 py-2 rounded-full border border-gray-500"
              >
                Back
              </button>
              <button
                onClick={next}
                className="px-8 py-2 rounded-full bg-yellow-400 text-black font-semibold"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 — Profile form (part 2) */}
        {step === 2 && (
          <div className="w-full space-y-5 mt-5">
            <p className="text-lg font-medium">
              Let’s work on your foundation today, {form.name || "Player"}.
              What skill do you want to sharpen?
            </p>
            <p className="text-sm text-gray-400">
              Current Level: {form.level || "Beginner"} <br />
              Last Drill: Form Shooting
            </p>

            {/* Drill Card */}
            <div className="bg-[#111] rounded-xl overflow-hidden shadow-md">
              <div className="relative">
                <img
                  src="https://d3rqy6w6tyyf68.cloudfront.net/AcuCustom/Sitename/DAM/128/scw106-whatispassing-p6_Thumb.png"
                  alt="Shooting Warm-Up"
                  className="w-full h-40 object-cover"
                />
                <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded">
                  DOACH RECOMMENDS
                </span>
              </div>
              <div className="p-4 space-y-3">
                <h3 className="text-lg font-semibold">Shooting Warm-Up</h3>
                <div className="flex space-x-3">
                  <button className="flex-1 border border-gray-500 rounded-full py-2 text-sm hover:bg-gray-800">
                    ▶ Watch Quick Tip
                  </button>
                  <button
                    onClick={finish}
                    className="flex-1 bg-yellow-400 text-black rounded-full py-2 font-semibold hover:bg-yellow-300"
                  >
                    Start Drill
                  </button>
                </div>
              </div>
            </div>

            {/* Skills Selection with Checkboxes */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {skills.map((skill, i) => (
                <label
                  key={i}
                  className="bg-[#111] p-4 rounded-lg flex flex-col cursor-pointer"
                >
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedSkills.includes(skill.name)}
                      onChange={() => {
                        setSelectedSkills((prev) =>
                          prev.includes(skill.name)
                            ? prev.filter((s) => s !== skill.name)
                            : [...prev, skill.name]
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

            {/* Back Button */}
            <div className="flex justify-start mt-4">
              <button
                onClick={back}
                className="px-6 py-2 rounded-full border border-gray-500"
              >
                Back
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 — Success Screen with Summary */}
        {step === 3 && (
        <div className="w-full space-y-6 mt-5 text-center">
            {/* Success message */}
            <div className="bg-[#111] p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-yellow-400">🎉 You're All Set!</h2>
            <p className="mt-2 text-gray-300">
                Welcome aboard, {form.name || "Player"}!  
                Your profile is ready and drills are customized for you.
            </p>
            </div>

            {/* Profile Summary */}
            <div className="bg-[#111] p-5 rounded-lg text-left space-y-2">
            <h3 className="text-lg font-semibold text-yellow-400">Your Streak</h3>
            <p><span className="font-medium">Mode:</span> {form.mode || "-"}</p>  {/* ✅ added */}
            </div>

            <div className="bg-[#111] p-5 rounded-lg text-left space-y-2">
            <h3 className="text-lg font-semibold text-yellow-400">Your Profile</h3>
            <p><span className="font-medium">Mode:</span> {form.mode || "-"}</p>  {/* ✅ added */}
            <p><span className="font-medium">Name:</span> {form.name || "-"}</p>
            <p><span className="font-medium">Age:</span> {form.age || "-"}</p>
            <p><span className="font-medium">Position:</span> {form.position || "-"}</p>
            <p><span className="font-medium">Level:</span> {form.level || "-"}</p>
            <p><span className="font-medium">Main Goal:</span> {form.goal || "-"}</p>
            </div>

            {/* Selected Skills */}
            <div className="bg-[#111] p-5 rounded-lg text-left">
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">Skills to Focus On</h3>
            {selectedSkills.length > 0 ? (
                <ul className="list-disc list-inside space-y-1">
                {selectedSkills.map((skill, i) => (
                    <li key={i} className="text-gray-300">{skill}</li>
                ))}
                </ul>
            ) : (
                <p className="text-gray-400">No skills selected</p>
            )}
            </div>

            {/* Continue Button */}
            <button
            onClick={finish}
            className="w-full bg-yellow-400 text-black rounded-full py-3 font-semibold hover:bg-yellow-300"
            >
            Go to Dashboard
            </button>
        </div>
        )}
      </Container>
      <HomeFooter />
    </div>
  );
}
