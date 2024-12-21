---

title: My Local AI Setup
updated: 2024-12-21 00:00
categories: AI, local-setup, hardware

---

# My Local AI Setup

## Current Gaming Computer Setup Turned AI Server

- 💻 **Processor**: Intel® Core™ i9-13900KS
- 🖥️ **Mainboard**: ASUS ROG Strix Z790-E Gaming WiFi II LGA 1700
- 🧠 **RAM**: 128GB DDR5
- 🎮 **GPU**: NVIDIA RTX 4090
- 💾 **SSD**: 1TB (Samsung 980 Pro)
- 🌐 **Network**: Upgraded to 10G (previously using the built-in 2.5G Ethernet on the mainboard)

The move to 10G networking aligns perfectly with my love for faster and more reliable connections. With a router capable of 40Gb support, this setup ensures seamless and blazing-fast data flow for both AI projects and everyday tasks.

## AI Models in Use

With my current setup, I utilize high-performance AI models tailored for different use cases:

### Large-Scale Tasks and Experimentation

- 🔍 **Model**: Llama 3.2 Vision (90B Parameters)
  - 📝 **Details**: This model relies heavily on my large RAM, providing moderate inference speeds. It excels at resource-intensive tasks and advanced experimentation.

### Daily Productivity

#### Text-Only Models

- 🖋️ **Model**: Llama 3.3 (70B Parameters)
  - 📝 **Details**: Ideal for advanced natural language processing tasks, this model delivers robust and reliable performance for daily use.

#### Multimodal Models

- 🖼️ **Model**: Llama 3.2 Vision (11B Parameters)
  - 📝 **Details**: Striking a balance between performance and efficiency, this model is excellent for day-to-day multimodal processing.

- 🌌 **Model**: InternVL2 (26B Parameters)
  - 📝 **Details**: With advanced vision-language capabilities, this model excels at complex multimodal tasks while maintaining efficiency for regular use.

## AI Deployment

I deploy my AI projects using Ollama.

### Installing Ollama on Fedora 41

1. 🔄 **Update Fedora**:

   - Keep your system updated:
     ```bash
     sudo dnf update -y
     ```

2. 🛠️ **Install Prerequisites**:

   - Install essential build tools and libraries:
     ```bash
     sudo dnf install -y gcc make cmake git curl wget
     ```

3. 🎮 **Install NVIDIA Drivers**:

   - Open the Software Center.
   - Search for "NVIDIA drivers" and install the appropriate ones for your GPU.
   - Follow the guided steps for enabling Secure Boot if necessary.

4. 🐋 **Set Up Docker (Optional)**:

   - For containerized environments, install Docker:
     ```bash
     sudo dnf install -y docker
     sudo systemctl start docker
     sudo systemctl enable docker
     ```

5. 📥 **Download and Install Ollama**:

   - Visit the [Ollama website](https://ollama.ai) for the latest version compatible with Fedora.
   - Use the terminal for installation:
     ```bash
     curl -fsSL https://ollama.ai/install.sh | sh
     ```

6. ✅ **Verify Installation**:

   - Check the installation:
     ```bash
     ollama --version
     ```
   - Test a model:
     ```bash
     ollama run test-model
     ```

By following these steps, I successfully set up Ollama on Fedora 41, ensuring smooth operation with my NVIDIA RTX 4090 GPU.

## Model Recommendations

### Small Models (<1B Parameters)

- **SmolLM**: 135M, 360M
- **Qwen2.5**: 0.5B

### Medium Models (1B - 3B Parameters)

- **Llama 3.2**: 1B & 3B
- **Qwen2.5**: 1.5B & 3B

### Sweet Spot Models (~7B Parameters)

These models are ideal for most modern systems:

- **Llama 3.1**: 8B (slightly above 7B but noteworthy)
- **Mistral 7B**
- **Ministral 8B 24.10**: Successor to Mistral 7B
- **Qwen2.5**: 7B
- **Qwen2-VL-7B**: Leading multimodal model in this range
- **Zephyr-7b-beta**: Fine-tuned from Mistral 7B

### Large Models (13B Parameters)

For advanced tasks requiring higher specifications:

- **Llama 3.2 Vision**: 11B (my go-to multimodal model)
- **Pixtral-12B-2409**: Multimodal model by Mistral AI
- **StableLM 2**: 12B
- **Qwen2.5**: 14B

### Advanced Models (20B+ Parameters)

#### Coding Assistants

- **Qwen2.5-Coder**: 32B
- **Deepseek-coder-v2**: 16B (base) or 67B (advanced). The 236B version is impractical for most hobbyists.

#### General Use

- **Llama3.3**: 70B
- **Qwen2.5**: 72B
- **Hermes3**: 70B
- **Sailor2**: 20B (specialized for Southeast Asia)

#### Math & Calculation

- **Command-R**: 35B
- **Deepseek-llm**: 67B (also excellent for coding tasks)

### Additional Notes

- **Moondream**: 1.8B (a small vision model)
- **Llava**: 13B (previously my go-to multimodal model)

### Models I Aspire to Run Locally

- **DeepSeek V2.5**: 236B
- **Mistral Large 24.11**: 123B
- **Zephyr Orpo**: 141B

Running models with 20B+ parameters often caters to geeks or enterprise-grade AI solutions, demanding robust hardware and significant resources.