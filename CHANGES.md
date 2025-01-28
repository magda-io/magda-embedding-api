# CHANGELOG

## v1.1.0

- Rename EmbeddingGenerator to EmbeddingEncoder
- Fixed serverOptions weren't passed through properly in test cases
- Upgrade to @huggingface/transformers v3.2.4
- Upgrade onnxruntime-node v1.20.1
- Avoid including unused models in docker images (smaller image size)
- Increase probe timeout seconds
- Use worker pool
- Process sentence list with separate model runs
- set default `workerTaskTimeout` to `60` seconds
- use quantized version (q8) default model
- set default `limits.memory` to `850M`
- set default replicas number to `2`
- Add max_length config to model config (configurable via helm config)
- set max_length of default model to 1024 due to excessive memory usage when working on text longer than 2048 (the default model supports up to 8192)
- only use padding for multiple inputs received when encoding the input

## v1.0.0

- #1: Initial implementation
