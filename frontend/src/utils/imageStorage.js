import { API_URL } from '../contracts/config';

// Lưu ảnh (base64) lên PostgreSQL qua PostgREST
export async function uploadImageToDB(hash, base64Image) {
  try {
    const response = await fetch(`${API_URL}/certificate_images`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal' // không cần trả về dữ liệu
      },
      body: JSON.stringify({
        hash: hash,
        image_base64: base64Image
      })
    });
    if (!response.ok) {
      throw new Error('Upload ảnh thất bại');
    }
    return true;
  } catch (err) {
    console.error('Lỗi upload ảnh:', err);
    return false;
  }
}

// Lấy ảnh (base64) từ PostgreSQL theo hash
export async function fetchImageFromDB(hash) {
  try {
    const response = await fetch(`${API_URL}/certificate_images?hash=eq.${hash}`, {
      headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) return null;
    const data = await response.json();
    if (data.length > 0) {
      return data[0].image_base64; // trả về chuỗi base64
    }
    return null;
  } catch (err) {
    console.error('Lỗi tải ảnh:', err);
    return null;
  }
}