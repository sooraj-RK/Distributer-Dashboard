import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';

const CancellationRequest = () => {
  const navigate = useNavigate();
  const storeNameRef = useRef();
  const freezerIdRef = useRef();
  const [isStoreNameOpen, setIsStoreNameOpen] = useState(false);
  const [isFreezerIdOpen, setIsFreezerIdOpen] = useState(false);

  const [formData, setFormData] = useState({
    storeName: '',
    freezerId: '',
    reason: ''
  });

  const [errors, setErrors] = useState({
    storeName: '',
    freezerId: '',
    reason: ''
  });

  const storeOptions = [
    "City Mart Downtown",
    "Swirl Nation",
    "GroCart India",
    "Kirana Xpress",
    "Local Loop Store"
  ];

  const freezerOptions = [
    "FZ1001",
    "FZ1002"
  ];

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
    // Clear error when user starts typing
    setErrors(prev => ({...prev, [field]: ''}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {};
    if (!formData.storeName) newErrors.storeName = 'Store Name is required';
    if (!formData.freezerId) newErrors.freezerId = 'Freezer ID is required';
    if (!formData.reason) newErrors.reason = 'Reason is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    console.log('Submit Request:', formData);
  };

  const handleCancel = () => {
    navigate('/cancellation');
  };

  const CustomDropdown = ({ anchorRef, isOpen, onClose, options, selected, setSelected, field }) => {
    const dropdownRef = useRef();

    useEffect(() => {
      const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target) ){
          onClose();
        }
      };
    
      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }
    
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
      <div
        ref={dropdownRef}
        className="absolute z-50 w-[500px] bg-white rounded-md shadow-lg border border-gray-200 mt-1"
      >
        <div className="flex flex-col max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                setFormData(prev => ({...prev, [field]: option}));
                setErrors(prev => ({...prev, [field]: ''}));
                onClose();
              }}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${selected === option ? 'bg-gray-50' : ''}`}
            >
              <div className="text-gray-700">{option}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={handleCancel}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-semibold">New Freezer Cancellation Request</h2>
        </div>

        <div className="flex gap-4">
          <button
            className="px-6 py-2 border border-gray-300 rounded-lg text-sm"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
            onClick={handleSubmit}
          >
            Submit Request
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Store Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 w-1/2">
            Store Name
          </label>
          <div className="relative w-[500px]">
            <div
              ref={storeNameRef}
              onClick={() => setIsStoreNameOpen(!isStoreNameOpen)}
              className={`border-2 ${errors.storeName ? 'border-red-200' : 'border-gray-300'} rounded-lg p-2 pr-8 text-sm w-full cursor-pointer flex items-center justify-between`}
            >
              {formData.storeName || "Select Store Name"}
              <ArrowDropDownOutlinedIcon 
                className="text-gray-500"
                fontSize="small"
              />
            </div>
            {isStoreNameOpen && (
              <CustomDropdown
                anchorRef={storeNameRef}
                isOpen={isStoreNameOpen}
                onClose={() => setIsStoreNameOpen(false)}
                options={storeOptions}
                selected={formData.storeName}
                setSelected={(value) => setFormData(prev => ({...prev, storeName: value}))}
                field="storeName"
              />
            )}
            {errors.storeName && (
              <p className="mt-1 text-sm text-red-400">{errors.storeName}</p>
            )}
          </div>
        </div>

        {/* Store ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 w-1/2">
            Store ID
          </label>
          <input
            type="text"
            className="w-[500px] border-2 border-gray-300 rounded-lg p-2 text-sm bg-gray-100"
            value="XD123RT567"
            disabled
          />
        </div>

        {/* Freezer ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 w-1/2">
            Freezer ID
          </label>
          <div className="relative w-[500px]">
            <div
              ref={freezerIdRef}
              onClick={() => setIsFreezerIdOpen(!isFreezerIdOpen)}
              className={`border-2 ${errors.freezerId ? 'border-red-200' : 'border-gray-300'} rounded-lg p-2 pr-8 text-sm w-full cursor-pointer flex items-center justify-between`}
            >
              {formData.freezerId || "Select Freezer ID"}
              <ArrowDropDownOutlinedIcon 
                className="text-gray-500"
                fontSize="small"
              />
            </div>
            {isFreezerIdOpen && (
              <CustomDropdown
                anchorRef={freezerIdRef}
                isOpen={isFreezerIdOpen}
                onClose={() => setIsFreezerIdOpen(false)}
                options={freezerOptions}
                selected={formData.freezerId}
                setSelected={(value) => setFormData(prev => ({...prev, freezerId: value}))}
                field="freezerId"
              />
            )}
            {errors.freezerId && (
              <p className="mt-1 text-sm text-red-400">{errors.freezerId}</p>
            )}
          </div>
        </div>

        {/* Reason for Cancellation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 w-1/2 hover:text-gray-500 transition-colors">
            Reason for Cancellation
          </label>
          <textarea
            className={`w-[500px] border-2 ${errors.reason ? 'border-red-200' : 'border-gray-300'} rounded-lg p-2 text-sm hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-200`}
            rows={4}
            placeholder="Please provide details on why this freezer needs to be cancelled"
            value={formData.reason}
            onChange={handleInputChange('reason')}
          />
          {errors.reason && (
            <p className="mt-1 text-sm text-red-400">{errors.reason}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CancellationRequest;