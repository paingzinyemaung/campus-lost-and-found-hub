import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCreateItem } from '../hook/item';
import toast from 'react-hot-toast';

export default function AddItem() {
  const navigate = useNavigate();
  const createMutation = useCreateItem();

  // Form States
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [status, setStatus] = useState('LOST'); // 'LOST' သို့မဟုတ် 'FOUND'
  const [location, setLocation] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // ပုံတင်သည့်အခါ Preview ပြရန်
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Form တင်သွင်းခြင်း
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!title || !location || !contactInfo) {
      setErrorMessage('ကျေးဇူးပြု၍ လိုအပ်သော အချက်အလက်များကို ဖြည့်စွက်ပါ။');
      toast.error('ကျေးဇူးပြု၍ လိုအပ်သော အချက်အလက်များကို ဖြည့်စွက်ပါ။');
      return;
    }

    // Backend သို့ ပို့ရန် FormData တည်ဆောက်ခြင်း
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('status', status);
    formData.append('location', location);
    formData.append('contactInfo', contactInfo);

    if (imageFile) {
      formData.append('image', imageFile);
    }

    createMutation.mutate(formData, {
      onSuccess: () => {
        toast.success('ပစ္စည်းအသစ် တင်ခြင်း အောင်မြင်ပါသည်။');
        navigate('/dashboard');
      },
      onError: (err: any) => {
        const errorMsg =
          err?.response?.data?.message ||
          'ပစ္စည်းတင်ရာတွင် အမှားအယွင်း ရှိသွားပါသည်။ ထပ်မံကြိုးစားပါ။';
        setErrorMessage(errorMsg);
        toast.error(errorMsg);
      },
    });
  };

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4 md:px-8 font-sans">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header & Back Button */}
        <div className="flex justify-between items-center bg-base-100 p-4 rounded-xl border border-base-300 shadow-sm">
          <div>
            <h1 className="text-xl font-bold text-base-content flex items-center gap-2">
              📦 ပစ္စည်းအသစ် တင်မည်
            </h1>
            <p className="text-xs text-base-content/70 mt-0.5">
              ပျောက်ဆုံး သို့မဟုတ် တွေ့ရှိသော ပစ္စည်းအချက်အလက်များကို
              ဖြည့်သွင်းပါ။
            </p>
          </div>
          <Link
            to="/dashboard"
            className="btn btn-outline btn-sm text-xs font-normal"
          >
            ← နောက်သို့
          </Link>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="alert alert-error shadow-sm text-sm py-2">
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-base-100 rounded-xl shadow-sm border border-base-300 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Status (Lost / Found) Selection */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs font-semibold text-base-content/80">
                  အမျိုးအစား (Status) *
                </span>
              </label>
              <div className="flex gap-3">
                <label
                  className={`flex-1 flex items-center justify-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-all text-xs ${status === 'LOST' ? 'border-error bg-error/10 text-error font-bold' : 'border-base-300 text-base-content/70'}`}
                >
                  <input
                    type="radio"
                    name="status"
                    value="LOST"
                    checked={status === 'LOST'}
                    onChange={() => setStatus('LOST')}
                    className="radio radio-error radio-sm"
                  />
                  ပျောက်ဆုံးပစ္စည်း (Lost)
                </label>
                <label
                  className={`flex-1 flex items-center justify-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-all text-xs ${status === 'FOUND' ? 'border-success bg-success/10 text-success font-bold' : 'border-base-300 text-base-content/70'}`}
                >
                  <input
                    type="radio"
                    name="status"
                    value="FOUND"
                    checked={status === 'FOUND'}
                    onChange={() => setStatus('FOUND')}
                    className="radio radio-success radio-sm"
                  />
                  တွေ့ရှိသောပစ္စည်း (Found)
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-xs font-semibold text-base-content/80">
                    ပစ္စည်းအမည် (Title) *
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="ဥပမာ - Student ID Card, iPhone 13"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input input-bordered input-sm w-full text-xs"
                  required
                />
              </div>

              {/* Category */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-xs font-semibold text-base-content/80">
                    အမျိုးအစားခွဲ (Category) *
                  </span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="select select-bordered select-sm w-full text-xs"
                >
                  <option value="Electronics">
                    Electronics (ဖုန်း၊ လက်ပ်တော့ စသည်)
                  </option>
                  <option value="Documents">
                    Documents & Cards (ကတ်ပြား၊ စာရွက်စာတမ်း)
                  </option>
                  <option value="Personal Items">
                    Personal Items (အသုံးအဆောင်ပစ္စည်း)
                  </option>
                  <option value="Books">
                    Books & Stationery (စာအုပ်၊ ဘောပင်)
                  </option>
                  <option value="Others">Others (အခြား)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Location */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-xs font-semibold text-base-content/80">
                    တွေ့ရှိ/ပျောက်ဆုံးသည့်နေရာ (Location) *
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="ဥပမာ - Main Library, C-Building"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="input input-bordered input-sm w-full text-xs"
                  required
                />
              </div>

              {/* Contact Info */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-xs font-semibold text-base-content/80">
                    ဆက်သွယ်ရန် (Contact Info) *
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="ဖုန်းနံပါတ် သို့မဟုတ် Telegram acc"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  className="input input-bordered input-sm w-full text-xs"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs font-semibold text-base-content/80">
                  အသေးစိတ်ဖော်ပြချက် (Description)
                </span>
              </label>
              <textarea
                placeholder="ပစ္စည်း၏ အရောင်၊ အမှတ်အသား သို့မဟုတ် အခြား အသေးစိတ်အချက်အလက်များ..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea textarea-bordered h-20 text-xs w-full"
              ></textarea>
            </div>

            {/* Image Upload & Preview */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs font-semibold text-base-content/80">
                  ပစ္စည်းပုံ (Image)
                </span>
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input file-input-bordered file-input-sm w-full flex-1 text-xs"
                />
                {imagePreview && (
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-lg ring ring-primary ring-offset-base-100 ring-offset-1">
                      <img src={imagePreview} alt="Preview" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={createMutation.isPending}
                className="btn btn-primary btn-sm w-full text-xs font-bold"
              >
                {createMutation.isPending ? (
                  <>
                    <span className="loading loading-spinner loading-xs"></span>
                    တင်နေပါသည်...
                  </>
                ) : (
                  '🚀 ပစ္စည်းစာရင်း တင်မည်'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
