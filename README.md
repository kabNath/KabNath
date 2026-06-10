# Wendenda Nathanael Kaboré

### Building AI-native wireless systems for 6G

PhD candidate at **National Taipei University of Technology** working on **multi-agent deep reinforcement learning** for UAV-assisted networks, **reconfigurable intelligent surfaces (RIS)**, and **space-air-ground integrated networks (SAGIN)**. 🏆 4.00 / 4.00 GPA

---

### 🛠 Tech stack

![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=flat&logo=pytorch&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=flat&logo=tensorflow&logoColor=white)
![CUDA](https://img.shields.io/badge/CUDA-76B900?style=flat&logo=nvidia&logoColor=white)
![NumPy](https://img.shields.io/badge/NumPy-013243?style=flat&logo=numpy&logoColor=white)
![C++](https://img.shields.io/badge/C++-00599C?style=flat&logo=cplusplus&logoColor=white)
![Sionna](https://img.shields.io/badge/NVIDIA_Sionna-76B900?style=flat&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=flat&logo=linux&logoColor=black)

**Specialty domains:** OFDM PHY · MIMO · LDPC · 5G NR · RIS · Federated Learning · MADDPG · PPO · O-RAN

---

### 🔬 Featured open-source work

#### ⚡ [cuda-phy-channel-estimation](https://github.com/kabNath/cuda-phy-channel-estimation)
GPU-accelerated MMSE channel estimation for OFDM-based 6G PHY. NumPy + CuPy backends, precomputed MMSE weights mapped to Tensor Core-friendly `complex64` GEMM, designed as a building block for NVIDIA Aerial cuPHY pipelines.

**Result:** ~9 dB MMSE gain over LS, matches theoretical `10·log₁₀(N/L)` bound · 7/7 unit tests passing · reproducible benchmarks

#### 🤖 [sionna-link-adaptation-drl](https://github.com/kabNath/sionna-link-adaptation-drl)
Deep RL for 5G NR link adaptation. Self-contained PPO in PyTorch, OLLA industry baseline, 28-index MCS table from 3GPP TS 38.214, non-stationary SNR with mobility/handover scenarios. Sionna integration path documented.

**Result:** PPO learns competitive policy from scratch with ~3 min CPU training, fair head-to-head vs OLLA · 15/15 unit tests passing

#### 🔐 [federated-csi-feedback](https://github.com/kabNath/federated-csi-feedback)
Federated learning for CSI feedback compression. CsiNet autoencoder + FedAvg under non-IID channel statistics, aligned with 3GPP Release 18 AI-RAN study item.

**Result:** FedAvg matches centralised performance (~−2 dB NMSE) and beats local-only by ~2 dB · 16/16 unit tests passing

#### 🚧 In active development
- `ris-beamforming-optimizer` — RIS phase optimization, manifold + deep learning algorithms
- `oran-resource-allocation-xapp` — O-RAN xApp-style resource scheduling with DRL

---

### 📈 Research output

8+ IEEE publications in AI-native wireless networks, covering:

- Hybrid federated learning with MADDPG for UAV-assisted access networks
- Reconfigurable intelligent surface optimization for 6G
- SAGIN architectures with Starlink LEO integration
- Channel estimation and beamforming for next-gen PHY

🔗 [Google Scholar] · [ORCID] · [ResearchGate]

---



### 🏛 Affiliations

- 🎓 **PhD candidate**, National Taipei University of Technology — 4.00 / 4.00 GPA
- 🟢 **NVIDIA NGC 6G Developer Program** — Member, 2026 cohort
- 👨‍🏫 **Advisors:** Prof. Hsin-Piao Lin · Assoc. Prof. Rong-Terng Juang

---

### 🌐 Connect

📧 [Email](mailto:nooptanio2007@gmail.com)
🎓 [Google Scholar](https://scholar.google.com/citations?user=TON_ID)
📍 Taipei, Taiwan · 🇫🇷 🇬🇧 🇹🇼 

---

<details>
<summary><b>📊 GitHub stats</b></summary>

![Nathan's GitHub stats](https://github-readme-stats.vercel.app/api?username=kabNath&show_icons=true&theme=tokyonight&hide_border=true)

![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=kabNath&layout=compact&theme=tokyonight&hide_border=true)

</details>
