


#ifndef __scanner_h__
#define __scanner_h__

#include <stdbool.h>

typedef enum {
  CTX_INITIAL,
  CTX_IN_TAG,
  CTX_IN_ATTR
} Ctx;
