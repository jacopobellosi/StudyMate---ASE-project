from subprocess import run
from os import path
import uuid

# a function that converts audio to wav
# in a standard format (Mono PCM) for use with vosk
######################################################################
# -ar 16000            -> output file bitrate 16k
# -ac 1                -> 1 (mono) channel
# -acodec pcm_s16le    -> use a signed-16bit-littleendian codec
#
# ffmpeg -i [in_file] -acodec pcm_s16le -ar 16000 -ac 1 [out_file.wav]

def convert_std_wav(in_file):
    unique_file_identifier = str(uuid.uuid1())
    file_dirname = path.dirname(in_file)
    out_file = path.join(file_dirname, f"conv_{unique_file_identifier}.wav")

    ## constructing the command
    # command = ["ffmpeg", "-i", f'"{in_file}"', "-acodec", "pcm_s16le", "-ar", "16000", "-ac", "1", f'"{out_file}"']
    command = f'vosk_transcriptor\\utils\\ffmpeg -i "{in_file}" -acodec pcm_s16le -ar 16000 -ac 1 "{out_file}"'

    output = run(command, capture_output=True)

    if "Error" in str(output):
        raise Exception(f"Cannot convert file {in_file} using FFmpeg")
    
    # else, file is created successfully
    return out_file