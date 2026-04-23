import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../contracts/config";

const HARDHAT_CHAIN_ID = "0x7A69"; // 31337 ở dạng hex

// Hàm chuyển mạng Hardhat Local
async function switchToHardhatLocal() {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: HARDHAT_CHAIN_ID }],
    });
  } catch (switchError) {
    // Nếu mạng chưa tồn tại, thêm mới
    if (switchError.code === 4902) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: HARDHAT_CHAIN_ID,
            chainName: "Hardhat Local",
            rpcUrls: ["http://127.0.0.1:8545"],
            nativeCurrency: {
              name: "ETH",
              symbol: "ETH",
              decimals: 18,
            },
          },
        ],
      });
    } else {
      throw switchError;
    }
  }
}

export const connectWalletAndGetContract = async () => {
  if (!window.ethereum) {
    alert("Vui lòng cài MetaMask!");
    return null;
  }

  try {
    // Kiểm tra chain ID hiện tại
    const currentChainId = await window.ethereum.request({
      method: "eth_chainId",
    });
    if (currentChainId !== HARDHAT_CHAIN_ID) {
      alert("Đang chuyển sang mạng Hardhat Local...");
      await switchToHardhatLocal();
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer,
    );
    return { address, contract };
  } catch (err) {
    console.error("Lỗi kết nối ví:", err);
    alert("Kết nối thất bại: " + err.message);
    return null;
  }
};

// Lắng nghe thay đổi mạng và tự động reload trang
window.ethereum?.on("chainChanged", () => {
  window.location.reload();
});

// Cấp chứng chỉ
export const issueCertificate = async (contract, hashBytes32, studentId) => {
  try {
    const tx = await contract.issueCertificate(hashBytes32, studentId);
    await tx.wait();
    return { success: true };
  } catch (err) {
    console.error("Lỗi cấp bằng:", err);
    return { success: false, error: err.message };
  }
};

// Xác thực chứng chỉ
export const verifyCertificate = async (contract, hashBytes32) => {
  try {
    const result = await contract.verifyCertificate(hashBytes32);
    return {
      studentId: result[0],
      issuedAt: new Date(Number(result[1]) * 1000).toLocaleString(),
      isValid: result[2],
    };
  } catch (err) {
    console.error("Lỗi xác thực:", err);
    return null;
  }
};
