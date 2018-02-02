package selenium_tests.src;

import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import selenium_tests.src.po.LoginPage;
import selenium_tests.src.po.TaskListPage;
import utils.*;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;

import java.io.FileReader;
import java.nio.file.FileSystem;
import java.util.Collection;
import java.util.concurrent.TimeUnit;

@RunWith(value = Parameterized.class)
@SuppressWarnings("Duplicates")
public class LoginTestParametrized {

  private String strId;
  private String strUsername;
  private String strPassword;

  private static WebDriver driver;
  private static LoginPage login;

  public LoginTestParametrized(String strId, String strUsername, String strPassword) {
    this.strId = strId;
    this.strUsername = strUsername;
    this.strPassword = strPassword;
  }

  @Parameterized.Parameters(name = "User id: {0}, username: {1}, password: {2}")
  public static Collection<String[]> testingData() {
    return CSVfileReader.readCSVfileToCollection("target/classes/login_credentials.csv");
  }

  @BeforeClass
  public static void setUp() {
    DesiredCapabilities dc = DesiredCapabilities.chrome();
    dc.setJavascriptEnabled(true);
    driver = new RemoteWebDriver(dc);
    driver.manage().timeouts().implicitlyWait(Constansts.IMPLICIT_WAIT, TimeUnit.MILLISECONDS);
    login = new LoginPage(driver);
    login.goTo();
  }

  @Test
  public void testWithGrid() {
    try {
      login.login(strUsername, strPassword);
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
    TaskListPage tasks = new TaskListPage(driver);
    Assert.assertTrue(tasks.getTaskList().isDisplayed());
    tasks.logOut();

  }

  @AfterClass
  public static void tearDown() throws InterruptedException {
    driver.quit();
  }


}
