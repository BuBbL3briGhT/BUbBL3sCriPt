	.text
	.file	"return_2.c"
	.globl	main                            // -- Begin function main
	.p2align	2
	.type	main,@function
main:                                   // @main
// %bb.0:
	mov	w0, #2                          // =0x2
	ret
.Lfunc_end0:
	.size	main, .Lfunc_end0-main
                                        // -- End function
	.ident	"clang version 19.1.6"
	.section	".note.GNU-stack","",@progbits
