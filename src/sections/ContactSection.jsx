import TitleAnimation from "../cards/TitleAnimation";

import { motion } from "framer-motion";
import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitch,
} from "lucide-react";
const getInTouch = [
  "G",
  "e",
  "t",
  "&nbsp;",
  "I",
  "n",
  "&nbsp;",
  "T",
  "o",
  "u",
  "c",
  "h",
];

const contact = [
  { icon: Mail, title: "Email", value: "garhasab001@gmail.com" },
  { icon: Phone, title: "Phone", value: "+1 (929) 755 3239" },
  { icon: MapPin, title: "Location", value: "Roselle Park, NJ, United States" },
];
// ... other imports

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 px-4">
      <div className="container mx-auto max-w-5xl">
        <TitleAnimation title={getInTouch} />
        <p className="text-foreground max-w-2xl text-center mx-auto mb-12">
          Have a project in mind or want to collaborate? Feel free to reach out.
          I am always open to discussing new oppertunity.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="font-semibold text-2xl mb-6 text-primary text-center">
              Contact
            </h3>
            <div className="space-y-6">
              {contact.map((item) => (
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-primary">{item.title}</h4>
                    <a
                      href={item.value}
                      className="text-foreground hover:text-primary transition-color"
                    >
                      {item.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-8 justify-center">
              <h4 className=" text-center font-bold  mb-4 text-primary mx-auto">
                Connect With Me
              </h4>
              <div className="flex space-x-4 justify-center">
                <a
                  href="#"
                  target="_blank"
                  className="bg-primary/10 rounded-full p-2"
                >
                  <Linkedin className="h-4 w-4 text-foreground" />
                </a>
              </div>
            </div>
          </div>
          <div className="p-8 rounded-lg shadow-xs bg-primary/20">
            <h4 className="font-semibold text-2xl mb-6 text-primary">
              Send A Message
            </h4>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2 text-primary"
                >
                  {" "}
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary placeholder:text-primary/50 "
                  placeholder="Karanpreet Singh...."
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 text-primary"
                >
                  {" "}
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary placeholder:text-primary/50 "
                  placeholder="john@gmail.com"
                />
              </div>

              <div>
                <label
                  htmlFor="Message"
                  className="block text-sm font-medium mb-2 text-primary"
                >
                  {" "}
                  Your Name
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary resize-none placeholder:text-primary/50 "
                  placeholder="Hello, I'd like to talk about...."
                />
              </div>
              <button
                type="submit"
                className=" mx-auto flex items-center justify-center gap-2 px-6 py-3 text-primary bg-primary/10 hover:bg-primary hover:text-background transition-colors rounded-full"
              >
                Send Message
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
