"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Extract the current locale from the URL (assuming it's the first segment)
  const currentLocale = pathname.split('/')[1];

  // Function to handle language change
  const handleLanguageChange = (event) => {
    const selectedLocale = event.target.value;

    // Split the pathname into segments
    const segments = pathname.split('/');

    // If the first segment is a locale (e.g., /en or /ar), replace it with the selectedLocale
    if (['en', 'ar'].includes(segments[1])) {
      segments[1] = selectedLocale;
    } else {
      // If no locale is present, prepend the selectedLocale
      segments.unshift(selectedLocale);
    }

    // Reconstruct the pathname with the updated locale
    const newPathname = segments.join('/');

    // Preserve the existing query parameters
    const queryParams = searchParams.toString();

    // Push the new route with the updated locale and query parameters
    router.push(`${newPathname}${queryParams ? `?${queryParams}` : ''}`);
  };

  // Effect to adjust RTL or LTR direction when locale changes
  useEffect(() => {
    const html = document.querySelector("html");
    if (currentLocale === "ar") {
      html.setAttribute("dir", "rtl");
    } else {
      html.setAttribute("dir", "ltr");
    }
  }, [currentLocale]);

  return (
    <div>
      <select onChange={handleLanguageChange} value={currentLocale}>
        <option value="en">English</option>
        <option value="ar">العربية</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
