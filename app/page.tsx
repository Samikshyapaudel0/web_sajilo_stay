"use client";

import Link from "next/link";
import {
  Bell,
  User,
  Search,
  MapPin,
  Calendar,
  Users,
  Star,
  Heart,
} from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [searchData, setSearchData] = useState({
    where: "",
    checkIn: "",
    guests: "",
  });

  const categories = [
    { name: "Room", icon: "🏠" },
    { name: "Apartment", icon: "🏢" },
    { name: "Home", icon: "🏡" },
    { name: "Hostel", icon: "🏰" },
  ];

  const popularStays = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
      title: "Mountain View Resort",
      location: "Pokhara, Nepal",
      rating: 4.9,
      reviews: 128,
      price: 120,
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      title: "Lake Side Cottage",
      location: "Pokhara, Nepal",
      rating: 4.8,
      reviews: 95,
      price: 85,
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
      title: "Heritage Boutique Hotel",
      location: "Kathmandu, Nepal",
      rating: 4.7,
      reviews: 203,
      price: 150,
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800",
      title: "Jungle Safari Lodge",
      location: "Chitwan, Nepal",
      rating: 4.6,
      reviews: 87,
      price: 95,
    },
  ];

  const recommendedStays = [
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
      title: "Peaceful Retreat",
      location: "Nagarkot, Nepal",
      rating: 4.9,
      reviews: 156,
      price: 110,
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      title: "Modern Apartment",
      location: "Lalitpur, Nepal",
      rating: 4.5,
      reviews: 72,
      price: 65,
    },
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      title: "Luxury Villa",
      location: "Bhaktapur, Nepal",
      rating: 4.8,
      reviews: 189,
      price: 200,
    },
    {
      id: 8,
      image:
        "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800",
      title: "Riverside Camp",
      location: "Trishuli, Nepal",
      rating: 4.7,
      reviews: 64,
      price: 45,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <img
                src="/images/logo.png"
                alt="Sajilo Stay"
                className="h-10 w-auto"
              />
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Explore
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Experiences
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Become a Host
              </Link>
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-4 py-2">
                <Search className="w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none ml-2 text-sm w-32"
                />
              </div>

              {/* Notification Icon */}
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Bell className="w-5 h-5 text-gray-700" />
              </button>

              {/* User Profile Icon */}
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <User className="w-5 h-5 text-gray-700" />
              </button>

              {/* Login Button */}
              <Link
                href="/login"
                className="px-4 py-2 bg-[#C63A07] text-white rounded-full font-medium hover:opacity-90 transition"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
            Find your perfect stay
            <br />
            anywhere in Nepal
          </h1>
          <button className="px-8 py-3 bg-[#C63A07] text-white rounded-full font-semibold hover:opacity-90 transition">
            Explore Now
          </button>
        </div>
      </section>

      {/* Search Form */}
      <section className="relative -mt-16 z-10 px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Where to */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Where to?
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search destinations"
                  value={searchData.where}
                  onChange={(e) =>
                    setSearchData({ ...searchData, where: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C63A07]"
                />
              </div>
            </div>

            {/* Check in */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Check in
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={searchData.checkIn}
                  onChange={(e) =>
                    setSearchData({ ...searchData, checkIn: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C63A07]"
                />
              </div>
            </div>

            {/* Who */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Who
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  placeholder="Guests"
                  value={searchData.guests}
                  onChange={(e) =>
                    setSearchData({ ...searchData, guests: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C63A07]"
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button className="w-full py-3 bg-[#C63A07] text-white rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center">
                <Search className="w-5 h-5 mr-2" />
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Explore by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {categories.map((category) => (
              <div
                key={category.name}
                className="flex flex-col items-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <span className="text-4xl mb-3">{category.icon}</span>
                <span className="font-medium text-gray-900">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Stays */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Popular Stays in Nepal
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularStays.map((stay) => (
              <div
                key={stay.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img
                    src={stay.image}
                    alt={stay.title}
                    className="w-full h-48 object-cover"
                  />
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full hover:bg-gray-100">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {stay.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{stay.location}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium ml-1">
                        {stay.rating}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">
                        ({stay.reviews})
                      </span>
                    </div>
                    <p className="font-bold text-gray-900">
                      Rs {stay.price}
                      <span className="text-sm font-normal text-gray-600">
                        /night
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Stays */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Recommended for You
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedStays.map((stay) => (
              <div
                key={stay.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img
                    src={stay.image}
                    alt={stay.title}
                    className="w-full h-48 object-cover"
                  />
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full hover:bg-gray-100">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {stay.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{stay.location}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium ml-1">
                        {stay.rating}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">
                        ({stay.reviews})
                      </span>
                    </div>
                    <p className="font-bold text-gray-900">
                      Rs {stay.price}
                      <span className="text-sm font-normal text-gray-600">
                        /night
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
            <div className="md:col-span-2">
              <img
                src="/images/logo.png"
                alt="Sajilo Stay"
                className="h-10 w-auto mb-4 brightness-0 invert"
              />
              <p className="text-gray-400 text-sm">
                Your trusted partner for finding the perfect stay in Nepal.
                Experience the beauty of Nepal with comfort and ease.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link href="#" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Safety Information
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Cancellation Options
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link href="#" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Forum
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Events
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Hosting</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link href="#" className="hover:text-white">
                    Host Your Home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Host an Experience
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Responsible Hosting
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Sajilo Stay. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-white text-sm">
                About
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm">
                Privacy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
