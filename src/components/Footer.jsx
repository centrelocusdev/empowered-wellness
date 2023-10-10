import React from "react";
import logo from "../assets/images/logo.png"
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"

const Footer = () => {
  return (
    <div className="md:px-16 p-8 md:flex md:text-left text-center text-gray-700 justify-between items-center bg-light-pink">
      <div className="">
        <img src={logo} alt="logo" className="w-24 mb-6 mx-auto md:mx-0" />
        <p>{new Date().getFullYear()} Empowerd Wellness. All rights reserved</p>
      </div>

      <div className="flex md:flex-row flex-col gap-8 capitalize md:mt-0 mt-5">
        {
          data.map(d => (
            <div className="md:text-left text-center">
              <h5 className="font-semibold text-lg ">{d.title}</h5>
              {d.links.map(link => (
                <a href={link.url} className="my-2 hover:underline flex justify-center md:justify-start items-center gap-2 ">{link.icon} {link.text}</a>
              ))}
            </div>
          ))
        }
      </div>
    </div>
  );
};

const data = [
  {
    title: 'home',
    links: [
      {
        text: 'about us',
        url: '#'
      },
      {
        text: 'our work',
        url: '#'
      },
      {
        text: 'our mission',
        url: '#'
      },
      {
        text: 'office',
        url: '#'
      },
    ]
  },
  {
    title: 'social media',
    links: [
      {
        text: 'instagram',
        url: '#',
        icon: <FaInstagram />
      },
      {
        text: 'twitter',
        url: '#',
        icon: <FaTwitter />
      },
      {
        text: 'linkedin',
        url: '#',
        icon: <FaLinkedin />
      }
    ]
  },
  {
    title: 'license',
    links: [
      {
        text: 'privacy policy',
        url: '#'
      },
      {
        text: 'copyright',
        url: '#'
      },
    ]
  }
]

export default Footer;
