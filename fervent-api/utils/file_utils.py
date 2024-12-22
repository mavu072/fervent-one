import os

def create_directory_if_not_exists(directory:str):
    if not os.path.exists(directory):
        os.mkdir(directory)
        print(f">>> Created new directory: {directory}.")