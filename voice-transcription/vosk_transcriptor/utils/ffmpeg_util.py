from subprocess import run

# a function that converts audio to wav
# in a standard format (Mono PCM) for use with vosk
######################################################################
# -ar 16000            -> output file bitrate 16k
# -ac 1                -> 1 (mono) channel
# -acodec pcm_s16le    -> use a signed-16bit-littleendian codec
#
# ffmpeg -i [in_file] -acodec pcm_s16le -ar 16000 -ac 1 [out_file.wav]

def convert_std_wav(in_file, out_file):
    output = run(["ffmpeg", "-i", f"{in_file}", "-acodec", "pcm_s16le", "-ar", "16000", "-ac", "1", f"{out_file}"], capture_output=True)
    
    if "Error" in str(output):
        print(output)

convert_std_wav("..\\audio_files\\non_standard_1.wav", "..\\audio_files\\out34.wav")