export class DisplayFileCountInfo {
  static kb = 1024;
  static mb = DisplayFileCountInfo.kb * 1024;
  static gb = DisplayFileCountInfo.mb * 1024;
  static tb = DisplayFileCountInfo.gb * 1024;

  public static fileSizeToDisplay(fileSize: number) {
    return {
      size: DisplayFileCountInfo.getFileSize(fileSize),
      units: DisplayFileCountInfo.getFileUnits(fileSize),
      divisor: DisplayFileCountInfo.getDivisor(fileSize)
    };
  }

  public static getFileSize(fileSize: number) {
    return fileSize / DisplayFileCountInfo.getDivisor(fileSize);
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

  public static getDivisor(fileSize: number) {
    if (fileSize < DisplayFileCountInfo.kb) {
      return 1;
    } else if (fileSize < DisplayFileCountInfo.mb) {
      return DisplayFileCountInfo.kb;
    } else if (fileSize < DisplayFileCountInfo.gb) {
      return DisplayFileCountInfo.mb;
    } else if (fileSize < DisplayFileCountInfo.tb) {
      return DisplayFileCountInfo.gb;
    } else {
      return DisplayFileCountInfo.tb;
    }
  }
}
