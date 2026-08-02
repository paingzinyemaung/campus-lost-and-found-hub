import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useItems } from '../hook/item';
import { useMe } from '../hook/auth';
import ItemDetailModal from './ItemDetailModal';

export default function Items() {
  const { data: itemsResponse, isLoading, error } = useItems();
  const { data: userData } = useMe();
  const navigate = useNavigate();

  const isAuthenticated = !!userData;

  // Search နှင့် Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // တစ်မျက်နှာလျှင် ပြမည့် ပစ္စည်းအရေအတွက်

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

  // Pagination တွက်ချက်ခြင်း (Filter ပြောင်းသွားရင် Page 1 ကို ပြန်သွားရန်)
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Search သို့မဟုတ် Filter ပြောင်းပါက Page 1 သို့ ပြန်ပို့ရန်
  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e: any) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (e: any) => {
    setSelectedStatus(e.target.value);
    setCurrentPage(1);
  };

  const handleBack = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

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
          <input
            type="text"
            placeholder="ပစ္စည်းအမည် (သို့) နေရာဖြင့် ရှာရန်..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="input input-bordered input-sm w-full text-xs"
          />
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="select select-bordered select-sm w-full text-xs"
          >
            <option value="ALL">အမျိုးအစားအားလုံး (All Categories)</option>
            <option value="Electronics">Electronics</option>
            <option value="Documents">Documents & Cards</option>
            <option value="Personal Items">Personal Items</option>
            <option value="Books">Books & Stationery</option>
            <option value="Others">Others</option>
          </select>
          <select
            value={selectedStatus}
            onChange={handleStatusChange}
            className="select select-bordered select-sm w-full text-xs"
          >
            <option value="ALL">အခြေအနေအားလုံး (All Status)</option>
            <option value="LOST">ပျောက်ဆုံးပစ္စည်း (Lost)</option>
            <option value="FOUND">တွေ့ရှိသောပစ္စည်း (Found)</option>
            <option value="RESOLVED">ပြီးမြောက်ပြီး (Resolved)</option>
          </select>
        </div>

        {/* Loading & Error States */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-md text-primary"></span>
          </div>
        )}

        {error && (
          <div className="alert alert-error text-xs shadow-sm">
            <span>ဒေတာရယူရာတွင် အမှားအယွင်း ရှိသွားပါသည်။</span>
          </div>
        )}

        {!isLoading && !error && filteredItems.length === 0 && (
          <div className="text-center py-16 bg-base-100 rounded-2xl border border-base-300">
            <p className="text-sm text-base-content/60">
              ရှာဖွေတွေ့ရှိသော ပစ္စည်းစာရင်း မရှိပါ...
            </p>
          </div>
        )}

        {/* Items Grid (currentItems ကိုပြရန်) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentItems.map((item: any) => (
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

        {/* DaisyUI Pagination Component */}
        {totalPages > 1 && (
          <div className="flex justify-center pt-4">
            <div className="join shadow-sm border border-base-300 bg-base-100">
              {/* ရှေ့သို့ ခလုတ် */}
              <button
                className="join-item btn btn-sm text-xs"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                « ရှေ့သို့
              </button>

              {/* Page Number ခလုတ်များ */}
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNum = index + 1;
                return (
                  <button
                    key={pageNum}
                    className={`join-item btn btn-sm text-xs ${currentPage === pageNum ? 'btn-active btn-primary' : ''}`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* နောက်သို့ ခလုတ် */}
              <button
                className="join-item btn btn-sm text-xs"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                နောက်သို့ »
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Item Detail Modal */}
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
