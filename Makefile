# Define source and target directories
SRC_DIR := fuente
TARGET_DIR := build/es

# Get a list of all source files
# Adjust the pattern if your files have a different extension (e.g., *.txt)
SRCS := $(wildcard $(SRC_DIR)/*)

# Create a list of target files by replacing the source directory with the target directory
# and potentially changing the file extension if your command outputs a different type
TARGETS := $(patsubst $(SRC_DIR)/%,$(TARGET_DIR)/%,$(SRCS))

.PHONY: all clean

all: $(TARGET_DIR) $(TARGETS)

$(TARGET_DIR):
	mkdir -p $(TARGET_DIR)

$(TARGET_DIR)/%: $(SRC_DIR)/%
	node slt-js.js $< > $@

clean:
	rm -rf $(TARGET_DIR)
