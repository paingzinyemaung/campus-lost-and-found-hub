import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Landing() {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col font-sans">
      <Navbar />

      {/* Hero Section - min-h-[calc(100vh-4rem)] ဖြင့် Screen အောက်ခြေအထိ အမည်းရောင်ပြည့်သွားစေရန် */}
      <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center py-16 px-4 bg-base-200">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase border border-primary/20">
            ✨ CAMPUS LOST & FOUND PLATFORM
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-base-content leading-loose pt-2">
            ပစ္စည်းပျောက်လို့ စိတ်ပူနေပြီလား? <br className="hidden md:block" />
            <span className="text-primary">အလွယ်တကူ ရှာဖွေလိုက်ပါ</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm md:text-base text-base-content/70 max-w-2xl mx-auto leading-relaxed">
            ကျောင်းဝင်းအတွင်း ပစ္စည်းပျောက်ဆုံးမှုများကို အချိန်နဲ့တစ်ပြေးညီ
            တင်ပြနိုင်ပြီး၊ ကောက်ရသူများနှင့် လွယ်ကူလျင်မြန်စွာ
            တိုက်ရိုက်ချိတ်ဆက်နိုင်မည့် ယုံကြည်စိတ်ချရသော စနစ်။
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/items"
              className="btn btn-primary btn-md sm:btn-lg w-full sm:w-auto shadow-md gap-2"
            >
              🔍 ပစ္စည်းစာရင်းများကို ကြည့်ရန်
            </Link>
            <Link
              to="/dashboard/add-item"
              className="btn btn-outline btn-md sm:btn-lg w-full sm:w-auto gap-2"
            >
              📢 ပစ္စည်းတင်မည် (Post Item)
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="py-20 bg-base-100 px-6 lg:px-12 border-t border-base-300">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-base-content leading-relaxed">
              ဘာကြောင့် ဒီစနစ်ကို အသုံးပြုသင့်တာလဲ?
            </h2>
            <p className="text-xs md:text-sm text-base-content/60 leading-relaxed">
              ကျောင်းသားများအတွက် အထူးရည်ရွယ်၍ အဆင်ပြေဆုံးနှင့် လုံခြုံအမြန်ဆုံး
              ပုံစံဖြင့် တည်ဆောက်ထားပါသည်။
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="card bg-base-200/50 border border-base-300 shadow-none hover:shadow-md transition-all">
              <div className="card-body p-8 space-y-3 text-center md:text-left">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl mb-2 mx-auto md:mx-0">
                  ⚡
                </div>
                <h3 className="card-title text-base font-bold justify-center md:justify-start">
                  လျင်မြန်လွယ်ကူခြင်း
                </h3>
                <p className="text-xs text-base-content/60 leading-relaxed">
                  စက္ကန့်ပိုင်းအတွင်း ပစ္စည်းပျောက် သို့မဟုတ် ကောက်ရကြောင်း
                  တင်ပြနိုင်ပြီး Feed ပေါ်တွင် ချက်ချင်းပေါ်လာမည်။
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="card bg-base-200/50 border border-base-300 shadow-none hover:shadow-md transition-all">
              <div className="card-body p-8 space-y-3 text-center md:text-left">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl mb-2 mx-auto md:mx-0">
                  🛡️
                </div>
                <h3 className="card-title text-base font-bold justify-center md:justify-start">
                  လုံခြုံစိတ်ချရမှု
                </h3>
                <p className="text-xs text-base-content/60 leading-relaxed">
                  ကိုယ်ရေးအချက်အလက်များကို ထိန်းချုပ်ထားပြီး
                  ပိုင်ရှင်အစစ်အမှန်နှင့်သာ တိုက်ရိုက်ချိတ်ဆက်နိုင်ခြင်း။
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="card bg-base-200/50 border border-base-300 shadow-none hover:shadow-md transition-all">
              <div className="card-body p-8 space-y-3 text-center md:text-left">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl mb-2 mx-auto md:mx-0">
                  🤝
                </div>
                <h3 className="card-title text-base font-bold justify-center md:justify-start">
                  တိုက်ရိုက်ဆက်သွယ်ရန်
                </h3>
                <p className="text-xs text-base-content/60 leading-relaxed">
                  ဖုန်းနံပါတ် သို့မဟုတ် ဆက်သွယ်ရန်လမ်းကြောင်းများဖြင့်
                  ကြားခံမလိုဘဲ အမြန်ဆုံး ဆက်သွယ်တုံ့ပြန်နိုင်ခြင်း။
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer footer-center p-6 bg-base-300 text-base-content text-xs border-t border-base-200 mt-auto">
        <div>
          <p className="font-medium">
            Campus Lost & Found Hub © 2026 - All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
