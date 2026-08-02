import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useItems } from '../hook/item';
import { useMe } from '../hook/auth';
import ItemDetailModal from './ItemDetailModal';

export default function Items() {
  const { data: itemsResponse, isLoading, error } = useItems();
  const { data: userData } = useMe();
  const navigate = useNavigate();

  // Login ဝင်ထားခြင်း ရှိမရှိ စစ်ဆေးခြင်း
  const isAuthenticated = !!userData;

  // Search နှင့် Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  // Item Detail Modal အတွက် States
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const items = itemsResponse?.data || itemsResponse || [];

  // Filter လုပ်ခြင်း
  const filteredItems = items.filter((item: any) => {
    const matchesSearch =
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesStatus =
      selectedStatus === 'ALL' || item.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // "နောက်သို့" ခလုတ်နှိပ်သည့်အခါ Login အခြေအနေအလိုက် လမ်းကြောင်းပြောင်းရန်
  const handleBack = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  // "+ ပစ္စည်းအသစ် တင်မည်" ခလုတ်နှိပ်သည့်အခါ Login စစ်ဆေးရန်
  const handleAddItem = () => {
    if (isAuthenticated) {
      navigate('/dashboard/add-item');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-base-100 p-6 rounded-2xl border border-base-300 shadow-sm gap-4">
          <div>
            <h1 className="text-2xl font-bold text-base-content flex items-center gap-2">
              🔍 ပစ္စည်းများ ရှာဖွေရန်
            </h1>
            <p className="text-xs text-base-content/70 mt-1">
              ကျောင်းဝန်းအတွင်း ပျောက်ဆုံးနေသော သို့မဟုတ် တွေ့ရှိထားသော
              ပစ္စည်းစာရင်းများ
            </p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button
              onClick={handleBack}
              className="btn btn-outline btn-sm text-xs flex-1 md:flex-none"
            >
              ← နောက်သို့
            </button>
            <button
              onClick={handleAddItem}
              className="btn btn-primary btn-sm text-xs flex-1 md:flex-none"
            >
              + ပစ္စည်းအသစ် တင်မည်
            </button>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-base-100 p-4 rounded-xl border border-base-300 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="form-control">
            <input
              type="text"
              placeholder="ပစ္စည်းအမည် (သို့) နေရာဖြင့် ရှာရန်..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered input-sm w-full text-xs"
            />
          </div>

          <div className="form-control">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="select select-bordered select-sm w-full text-xs"
            >
              <option value="ALL">အမျိုးအစားအားလုံး (All Categories)</option>
              <option value="Electronics">Electronics</option>
              <option value="Documents">Documents & Cards</option>
              <option value="Personal Items">Personal Items</option>
              <option value="Books">Books & Stationery</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="form-control">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="select select-bordered select-sm w-full text-xs"
            >
              <option value="ALL">အခြေအနေအားလုံး (All Status)</option>
              <option value="LOST">ပျောက်ဆုံးပစ္စည်း (Lost)</option>
              <option value="FOUND">တွေ့ရှိသောပစ္စည်း (Found)</option>
            </select>
          </div>
        </div>

        {/* Loading & Error States */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-md text-primary"></span>
          </div>
        )}

        {error && (
          <div className="alert alert-error text-xs shadow-sm">
            <span>
              ဒေတာရယူရာတွင် အမှားအယွင်း ရှိသွားပါသည်။ (Backend API ချိတ်ဆက်မှု
              သို့မဟုတ် Token အခြေအနေကို စစ်ဆေးပေးပါ)
            </span>
          </div>
        )}

        {!isLoading && !error && filteredItems.length === 0 && (
          <div className="text-center py-16 bg-base-100 rounded-2xl border border-base-300">
            <p className="text-sm text-base-content/60">
              ရှာဖွေတွေ့ရှိသော ပစ္စည်းစာရင်း မရှိပါ...
            </p>
          </div>
        )}

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item: any) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedItem(item);
                setIsModalOpen(true);
              }}
              className="bg-base-100 rounded-xl border border-base-300 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all cursor-pointer"
            >
              <div>
                <div className="h-44 w-full bg-base-200 relative overflow-hidden">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-base-content/40">
                      ပုံမရှိပါ
                    </div>
                  )}
                  <span
                    className={`absolute top-3 right-3 badge badge-sm font-bold text-[10px] ${item.status === 'LOST' ? 'badge-error' : 'badge-success'}`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <h2 className="font-bold text-sm text-base-content line-clamp-1">
                      {item.title}
                    </h2>
                    <span className="badge badge-outline text-[10px]">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-base-content/70 flex items-center gap-1">
                    📍 {item.location}
                  </p>
                  <p className="text-xs text-base-content/60 line-clamp-2">
                    {item.description || 'အသေးစိတ်ဖော်ပြချက် မရှိပါ။'}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-base-200 mt-2 flex items-center justify-between text-xs">
                <span className="text-base-content/70">
                  📞 {item.contactInfo}
                </span>
                <span className="text-[10px] text-base-content/50">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Item Detail Modal Component */}
      <ItemDetailModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
        }}
      />
    </div>
  );
}
