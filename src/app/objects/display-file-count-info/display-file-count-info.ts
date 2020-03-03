export class DisplayFileCountInfo {
  static kb = 1024;
  static mb = DisplayFileCountInfo.kb * 1024;
  static gb = DisplayFileCountInfo.mb * 1024;
  static tb = DisplayFileCountInfo.gb * 1024;

  public static fileSizeToDisplay(fileSize: number) {
    return {
      size: DisplayFileCountInfo.getFileSize(fileSize),
      units: DisplayFileCountInfo.getFileUnits(fileSize)
    };
  }

  public static getFileSize(fileSize: number) {
    if (fileSize < DisplayFileCountInfo.kb) {
      return fileSize;
    } else if (fileSize < DisplayFileCountInfo.mb) {
      return fileSize / DisplayFileCountInfo.kb;
    } else if (fileSize < DisplayFileCountInfo.gb) {
      return fileSize / DisplayFileCountInfo.mb;
    } else if (fileSize < DisplayFileCountInfo.tb) {
      return fileSize / DisplayFileCountInfo.gb;
    } else {
      return fileSize / DisplayFileCountInfo.tb;
    }
  }

  public static getFileUnits(fileSize: number) {
    if (fileSize < DisplayFileCountInfo.kb) {
      return 'BYTES';
    } else if (fileSize < DisplayFileCountInfo.mb) {
      return 'KB';
    } else if (fileSize < DisplayFileCountInfo.gb) {
      return 'MB';
    } else if (fileSize < DisplayFileCountInfo.tb) {
      return 'GB';
    } else {
      return 'TB';
    }
  }
}
