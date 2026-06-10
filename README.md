<div align="center">

![banner](banner-6g-trading.svg)

</div>

### Multi-agent AI for complex dynamic systems — from 6G networks to financial markets

PhD candidate at **National Taipei University of Technology** working on **multi-agent deep reinforcement learning** for UAV-assisted networks, **reconfigurable intelligent surfaces (RIS)**, and **space-air-ground integrated networks (SAGIN)** — and applying the same toolkit to **systematic trading**: regime detection, risk control, and production ML that survives real markets. 🏆 4.00 / 4.00 GPA

---

### 🛠 Tech stack

![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=flat&logo=pytorch&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=flat&logo=tensorflow&logoColor=white)
![CUDA](https://img.shields.io/badge/CUDA-76B900?style=flat&logo=nvidia&logoColor=white)
![NumPy](https://img.shields.io/badge/NumPy-013243?style=flat&logo=numpy&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-150458?style=flat&logo=pandas&logoColor=white)
![C++](https://img.shields.io/badge/C++-00599C?style=flat&logo=cplusplus&logoColor=white)
![Sionna](https://img.shields.io/badge/NVIDIA_Sionna-76B900?style=flat&logoColor=white)
![QuantConnect](https://img.shields.io/badge/QuantConnect-F5AE29?style=flat&logoColor=black)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=flat&logo=linux&logoColor=black)

**Specialty domains:** OFDM PHY · MIMO · LDPC · 5G NR · RIS · O-RAN · Federated Learning · MADDPG · PPO · Systematic trading · Regime detection · Risk management

---

## 🛰 AI-native wireless & 6G

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

## 📈 Systematic trading & quantitative ML

#### 🧭 [market-regime-engine](https://github.com/kabNath/market-regime-engine)
Regime detection, risk allocation and live health monitoring for systematic trading systems — the open-sourced **production layer** of a live book. Six-indicator regime classifier (BULL/NEUTRAL/BEAR/CRISIS) with hard crisis gates, inverse-volatility weighting with portfolio vol targeting, and a monitoring battery with a trailing-drawdown kill-switch.
**Result:** explainable-by-construction regime calls · fail-safe `tradeable` flag for automated halts · 9/9 unit tests passing · CI

#### 💼 AI Capital *(private — flagship system)*
End-to-end multi-asset systematic trading system on QuantConnect: multi-horizon cross-asset momentum, regime detection, volatility targeting and crisis routing, iterated through 11+ versions under strict out-of-sample validation with bias auditing (look-ahead, weight-cap, vol-estimation pitfalls). Live monitoring, anomaly detection and an investor-relations web platform (Next.js/Vercel).
**Status:** active paper-trading track record

#### 🔬 Alpha research — WorldQuant BRAIN
Systematic factor research on a professional simulation platform; first passing alpha cleared platform evaluation thresholds.

---

### 📊 Research output

8+ IEEE publications in AI-native wireless networks, covering:
- Hybrid federated learning with MADDPG for UAV-assisted access networks
- Reconfigurable intelligent surface optimization for 6G
- SAGIN architectures with Starlink LEO integration
- Channel estimation and beamforming for next-gen PHY

🔗 [ORCID](https://orcid.org/0009-0006-8255-8711)

---

### 🏛 Affiliations

- 🎓 **PhD candidate**, National Taipei University of Technology — 4.00 / 4.00 GPA
- 🟢 **NVIDIA NGC 6G Developer Program** — Member, 2026 cohort
- 👨‍🏫 **Advisors:** Prof. Hsin-Piao Lin · Assoc. Prof. Rong-Terng Juang

---

### 🌐 Connect

📧 [Email](mailto:nooptanio2007@gmail.com) · 💼 [LinkedIn](https://www.linkedin.com/in/wendenda-nathanael-kabore-87b7b3272/) · 🎓 [ORCID](https://orcid.org/0009-0006-8255-8711)
📍 Taipei, Taiwan · 🇫🇷 🇬🇧 🇹🇼

---

<details>
<summary><b>📊 GitHub stats</b></summary>

![Nathan's GitHub stats](https://github-readme-stats.vercel.app/api?username=kabNath&show_icons=true&theme=tokyonight&hide_border=true)
![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=kabNath&layout=compact&theme=tokyonight&hide_border=true)

</details>
