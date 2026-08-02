import { Link } from 'react-router-dom';
import { useMe } from '../hook/auth';
import { useItems, useUpdateItem, useDeleteItem } from '../hook/item';

interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  contactInfo: string;
  status: string; // ဥပမာ - 'LOST', 'FOUND', 'RESOLVED'
  imageUrl: string;
  userId: string;
  createdAt: string;
}

export default function Home() {
  // --- Data ဆွဲယူခြင်း ---
  // const { data: userData, isLoading: isUserLoading } = useMe();
  // const { data: itemsData, isLoading: isItemsLoading } = useItems();

  // const updateMutation = useUpdateItem();
  // const deleteMutation = useDeleteItem();

  // // API response မှ data ကို အဆင့်ဆင့် ဖြေရှင်းယူခြင်း
  // const resData = userData?.data || userData;
  // const currentUser = resData?.data || resData?.user || resData;
  // --- Data ဆွဲယူခြင်း ---

  const { data: userData, isLoading: isUserLoading } = useMe();
  const { data: itemsData, isLoading: isItemsLoading } = useItems();

  const updateMutation = useUpdateItem();
  const deleteMutation = useDeleteItem();

  // API မှ response ကို ယူခြင်း
  const resData = userData?.data || userData;

  // Backend မှ `user` ဆိုသည့် key ဖြင့် ပို့လိုက်သောကြောင့် ထို data ကို ယူပါမည်
  const currentUser = resData?.user || resData?.data || resData;

  // getItems API တွင် res.data.data ကို တိုက်ရိုက် return ထားသဖြင့် itemsData သည် Array ဖြစ်နေပါပြီ
  const items: Item[] = itemsData || [];

  // မိမိကိုယ်တိုင် တင်ထားသော ပစ္စည်းများကိုသာ စစ်ထုတ်ရန် (Backend တွင် User ID ဖြင့် Filter မလုပ်ထားပါက)
  const myItems = items.filter((item) => item.userId === currentUser?.id);

  // --- Event Handlers ---
  const handleToggleStatus = (item: Item) => {
    const newStatus = item.status === 'RESOLVED' ? 'LOST' : 'RESOLVED';

    // PUT Method ဖြစ်သဖြင့် ကျန်သော Data များကိုပါ ပူးတွဲပို့ပေးပါသည်
    updateMutation.mutate({
      id: item.id,
      data: {
        ...item,
        status: newStatus,
      },
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('ဒီပစ္စည်းစာရင်းကို ဖျက်ရန် သေချာပါသလား?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isUserLoading || isItemsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // --- Statistics ---
  const totalPosted = myItems.length;
  const lostCount = myItems.filter((item) => item.status === 'LOST').length;
  const foundCount = myItems.filter((item) => item.status === 'FOUND').length;
  const resolvedCount = myItems.filter(
    (item) => item.status === 'RESOLVED',
  ).length;
  {
    console.log('All items:', myItems);
  }
  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8 flex flex-col font-sans">
      <div className="max-w-7xl mx-auto space-y-8 w-full">
        {/* User Profile Section */}
        {currentUser && (
          <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="avatar placeholder">
                <div className="bg-primary text-primary-content rounded-full w-16 flex items-center justify-center">
                  <span className="text-xl font-bold">
                    {currentUser.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-base-content">
                  ကြိုဆိုပါတယ်၊ {currentUser.name}! 👋
                </h1>
                <div className="flex flex-wrap gap-2 md:gap-4 mt-2 text-sm text-base-content/70">
                  <span className="flex items-center gap-1">
                    {currentUser.email}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex w-full md:w-auto gap-3">
              <Link to="/items" className="btn btn-outline flex-1 md:flex-none">
                ပစ္စည်းများ ရှာဖွေရန်
              </Link>
              <Link
                to="/dashboard/add-item"
                className="btn btn-primary flex-1 md:flex-none"
              >
                + ပစ္စည်းအသစ် တင်မည်
              </Link>
            </div>
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="stat bg-base-100 rounded-2xl shadow-sm border border-base-300">
            <div className="stat-title font-medium">စုစုပေါင်းတင်ထားမှု</div>
            <div className="stat-value text-base-content mt-2">
              {totalPosted}
            </div>
          </div>
          <div className="stat bg-base-100 rounded-2xl shadow-sm border border-error/20">
            <div className="stat-title font-medium">ပျောက်ဆုံး (Lost)</div>
            <div className="stat-value text-error mt-2">{lostCount}</div>
          </div>
          <div className="stat bg-base-100 rounded-2xl shadow-sm border border-success/20">
            <div className="stat-title font-medium">တွေ့ရှိ (Found)</div>
            <div className="stat-value text-success mt-2">{foundCount}</div>
          </div>
          <div className="stat bg-base-100 rounded-2xl shadow-sm border border-info/20">
            <div className="stat-title font-medium">ပြီးမြောက် (Resolved)</div>
            <div className="stat-value text-info mt-2">{resolvedCount}</div>
          </div>
        </div>

        {/* Items Table Section */}
        <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300 overflow-hidden">
          <div className="p-6 border-b border-base-300 flex justify-between items-center">
            <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
              📦 ကိုယ်တိုင်တင်ထားသော ပစ္စည်းများ
            </h2>
            <div className="badge badge-primary">{myItems.length}</div>
          </div>

          {myItems.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="text-5xl mb-4">📭</div>
              <h3 className="text-lg font-bold mb-2">
                ပစ္စည်းစာရင်း မရှိသေးပါ
              </h3>
              <p className="text-base-content/60 mb-6">
                သင်တင်ထားသော ပျောက်ဆုံး/တွေ့ရှိ ပစ္စည်းများ ဤနေရာတွင်
                ပေါ်လာပါမည်။
              </p>
              <Link to="/dashboard/add-item" className="btn btn-primary">
                ပစ္စည်း စတင်တင်မည်
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead className="bg-base-200/50">
                  <tr>
                    <th>စဉ်</th>
                    <th>အမည်</th>
                    <th>အမျိုးအစား</th>
                    <th>အခြေအနေ</th>
                    <th>ရက်စွဲ</th>
                    <th className="text-right">လုပ်ဆောင်ချက်များ</th>
                  </tr>
                </thead>
                <tbody>
                  {myItems.map((item, index) => (
                    <tr key={item.id} className="hover">
                      <th className="font-normal text-base-content/60">
                        {index + 1}
                      </th>
                      <td className="font-semibold text-base-content">
                        <div className="flex items-center gap-3">
                          {item.imageUrl && (
                            <div className="avatar">
                              <div className="mask mask-squircle w-10 h-10">
                                <img src={item.imageUrl} alt={item.title} />
                              </div>
                            </div>
                          )}
                          <div>
                            <div className="font-bold">{item.title}</div>
                            <div className="text-xs opacity-50">
                              {item.location}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{item.category}</td>
                      <td>
                        <div
                          className={`badge ${
                            item.status === 'LOST'
                              ? 'badge-error'
                              : item.status === 'FOUND'
                                ? 'badge-success'
                                : 'badge-info'
                          } badge-sm font-medium`}
                        >
                          {item.status}
                        </div>
                      </td>
                      <td className="text-sm text-base-content/70">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleToggleStatus(item)}
                            disabled={updateMutation.isPending}
                            className={`btn btn-sm ${item.status !== 'RESOLVED' ? 'btn-outline btn-info' : 'btn-ghost'}`}
                          >
                            {item.status !== 'RESOLVED'
                              ? 'Resolved ပြောင်းမည်'
                              : 'Active ပြန်လုပ်မည်'}
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            disabled={deleteMutation.isPending}
                            className="btn btn-sm btn-square btn-outline btn-error"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
